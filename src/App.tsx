/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import './App.css';
import { NavigateFunction, Route, Routes, useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import FeedId from './FeedId';
import { parse } from 'fast-xml-parser';
import { IFeedMapping } from './FeedTypes';
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import erc725schema from '@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json';
import Web3 from 'web3';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import Feed725Schema from "./Feed725Schema.json"
import { Dialog, Transition } from '@headlessui/react'
import he from "he";
import Logo from './Logo';
import Add from './Add';
import Home from './Home';
import Profile from './Profile';
import NavigationLink from './NavigationLink';

const RPC_ENDPOINT = 'https://rpc.l16.lukso.network';
const IPFS_GATEWAY = 'https://2eff.lukso.dev/ipfs/';

const web3 = new Web3((window as any).ethereum);

const config = { ipfsGateway: IPFS_GATEWAY };
const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);

async function removeProfileFeeds(address: string) {
  const contract = new web3.eth.Contract(
    UniversalProfile.abi as any, address, {
      gas: 5_000_000,
      gasPrice: '1000000000',
    })

  return new Promise((resolve, reject) => {
    contract.methods
      ["setData(bytes32[],bytes[])"]([Feed725Schema.key], ["0x0000000000000000000000000000000000000000000000000000000000000000"])
      .send({
          from: address, // from eth_requestAccounts
      })
      .on("receipt", resolve)
      .on("sending", console.log);
  });
};

async function setProfileFeeds(feeds: IFeedMapping, address: string) {
  // Encode the data
  const profile = new ERC725(erc725schema.concat([Feed725Schema])  as ERC725JSONSchema[], address, provider, config);

  const contract = new web3.eth.Contract(
    UniversalProfile.abi as any, address, {
      gas: 5_000_000,
      gasPrice: '1000000000',
    })

  const encodedData = profile.encodeData([
    {
      keyName: Feed725Schema.name,
      value: Object.keys(feeds)
    }
  ]);

  return new Promise((resolve, reject) => {
    contract.methods
      ["setData(bytes32[],bytes[])"](encodedData.keys, encodedData.values)
      .send({
          from: address, // from eth_requestAccounts
      })
      .on("receipt", resolve)
      .on("sending", console.log);
  });
};


/*
 * Try fetching the @param's Universal Profile
 *
 * @param address of Universal Profile
 * @return string JSON or custom error
 */
export async function fetchProfile(address: string) {
  try {
    const profile = new ERC725(erc725schema.concat([Feed725Schema]) as ERC725JSONSchema[], address, provider, config);
    return await profile.fetchData();
  } catch (error) {
    return console.log('This is not an ERC725 Contract', error);
  }
}

function App() {
  let navigate : NavigateFunction = useNavigate();
  const [feeds, setFeeds] = useState<IFeedMapping>({});
  const [isModalOpen, setModalIsOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false);
  const [account, setAccount] = useState<string | undefined>();
  const [profileData, setProfileData] = useState<any>();
  const handleConnect = async () => {
    setModalIsOpen(true);
    let accounts: string[];
    try {
      accounts = await web3.eth.requestAccounts();
    } finally {
      setModalIsOpen(false);
    }
    if (accounts && accounts.length > 0) {
      setAccount(accounts[0]);
      setLoggedIn(true);
    }
  }
  const logout = async () => {
    setAccount(undefined);
    setLoggedIn(false);
    setProfileData(undefined);
    setFeeds({});
  }
  const removeFeed = async (feedUrl: string) => {
    if (!account) {
      throw new Error('Not logged in');
    }
    const newFeeds = {...feeds};
    delete newFeeds[feedUrl];
    if (Object.keys(newFeeds).length !== 0) {
      setModalIsOpen(true)
      try {
        await setProfileFeeds(newFeeds, account);
        setFeeds(newFeeds);
      } finally {
        setModalIsOpen(false)
      }
    } else {
      setModalIsOpen(true)
      try {
        await removeProfileFeeds(account);
        setFeeds(newFeeds);
        navigate('/');
      } finally {
        setModalIsOpen(false)
      }
    }
  };
  const addFeed = (feedUrl: string) => {
    if (feedUrl.length === 0) {
      return;
    }
    fetch(feedUrl)
        .then(res => res.text())
        .then((text)=> {
          var result1 = parse(text, {
            ignoreAttributes: false,
            attributeNamePrefix: "",
            parseAttributeValue: true,
            parseNodeValue: true
          });
          const newFeeds = {
            ...feeds,
            [feedUrl]: result1.rss
          }
          return newFeeds;
        }).then(async (newFeeds) => {
          if (!account) {
            throw new Error('Not logged in');
          }
          setModalIsOpen(true)
          try {
            await setProfileFeeds(newFeeds, account);
            setFeeds(newFeeds);
            navigate(`/feed/${encodeURIComponent(feedUrl)}`);
          } finally {
            setModalIsOpen(false)
          }
        })
  }
  useEffect(() => {
    if (account) {
      fetchProfile(account).then(async (profileData) =>{
        setProfileData(profileData);
        if (profileData) {
          // if any feed is in the user profile, add it to the feeds state
          const profileFeeds = profileData.find((feed) => feed.key === web3.utils.keccak256(Feed725Schema.name));
          if (profileFeeds) {
            for (const feed of profileFeeds.value as string[]) {
              const res = await fetch(feed)
              const text = await res.text();
              var parsed = parse(text, {
                ignoreAttributes: false,
                attributeNamePrefix: "",
                parseAttributeValue: true,
                parseNodeValue: true
              });
              // eslint-disable-next-line no-loop-func
              setFeeds((prevState) => ({
                ...prevState,
                [feed]: parsed.rss
              }));
            }
          }
        }
      });
    }
  }, [account])
  useEffect(() => {
    web3.eth.getAccounts().then((accounts) => {
      if (accounts && accounts.length > 0) {
        setLoggedIn(true);
        setAccount(accounts[0]);
      }
    });
  }, [])
  const userProfile = profileData && profileData.find((profileDataObj: any) => profileDataObj.name === "LSP3Profile");

  return (
    <div className="flex flex-row">
      <aside className="w-72 sticky py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-screen top-0" aria-label="Sidebar">
        <ul className="space-y-2 w-64">
          <li className="flex items-center p-2 align-middle text-base text-gray-900 rounded-lg dark:text-white tracking-tighter">
            <NavigationLink className={"no-underline inline align-middle"} to={"/"}>
              <Logo /> 
              <span className="absolute text-xl font-semibold top-6 ml-2">Lukso Reader</span>
            </NavigationLink>
          </li>
          <li className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <NavigationLink className="ml-3 no-underline px-2" to={"/"} activeClassName="rounded-lg bg-gray-600">Home</NavigationLink>
          </li>
          <li className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <NavigationLink className="ml-3 no-underline px-2" to={"/add"}  activeClassName="rounded-lg bg-gray-600">Add Feed</NavigationLink>
          </li>
          <li>
              <div className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg  duration-75 group dark:text-white" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap px-2">Feeds</span>
                <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">{Object.keys(feeds).length}</span>
              </div>
              <ul id="dropdown" className="py-2 space-y-2">
                {Object.keys(feeds).map((feedUrl: string) => {
                  return (
                    <li className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 justify-between">
                      <NavigationLink to={`/feed/${encodeURIComponent(feedUrl)}`} className="mr-5 px-2" activeClassName="rounded-lg bg-gray-600">
                        {he.unescape(feeds[feedUrl].channel.title)}
                      </NavigationLink>
                      <a className='hover:bg-red-700 hover:rounded-sm cursor-pointer' onClick={() => removeFeed(feedUrl)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-right">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </a>
                    </li>
                  );
                })}
              </ul>
          </li>
          {!loggedIn &&
            <li>
              <a onClick={handleConnect} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Connect</span>
              </a>
          </li>
          }
        
        </ul>
        {loggedIn &&
          <div className="mt-6 w-64 mx-auto absolute bottom-0">
            {userProfile &&
            <>
              <img src={userProfile?.value.LSP3Profile.profileImage[0] && userProfile?.value.LSP3Profile.profileImage[0].url.replace("ipfs://", IPFS_GATEWAY)} className="rounded-full w-16 mb-3 mx-auto"/>
              <div className='text-teal-500 font-semibold text-2xl tracking-wide text-center'>{userProfile?.value.LSP3Profile.name}</div>
              <div className='text-base text-gray-500 mt-2.5 text-center'>{userProfile?.value.LSP3Profile.description}</div>
            </>
            }
            {loggedIn &&
                <a onClick={logout} className="no-underline flex cursor-pointer items-center p-2 text-base font-normal text-right text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
                </a>
            }
          </div>
        }
      </aside>
      <div className="flex container">
        {!loggedIn &&
          <Home onClick={handleConnect} loggedIn={loggedIn}/>
        }
        {loggedIn &&
          <Routes>
            <Route path="/" element={<Home loggedIn={loggedIn} onClick={handleConnect}/>} />
            <Route path="/add" element={<Add addFeed={addFeed} />} />
            <Route path="/feed/:feedId" element={<FeedId feeds={feeds}/>} />
            <Route path="/profile/:address" element={<Profile />} />
          </Routes>
        }
      </div>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" onClose={() => setModalIsOpen(false)} className="relative z-50">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 mb-4"
                    >
                      Check your extension and approve the request.
                    </Dialog.Title>
                    <div className="mt-2 flex mb-4">
                      <svg className="animate-spin -ml-1 mr-3 h-16 w-16 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p className="text-sm text-gray-500 mt-5">
                        You should be prompted to confirm an action.
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setModalIsOpen(false)}
                      >
                        Got it, thanks!
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default App;
