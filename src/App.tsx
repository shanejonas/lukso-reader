import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './Home';
import { useEffect, useState } from 'react';
import FeedId from './FeedId';
import { parse } from 'fast-xml-parser';
import { IFeedMapping } from './FeedTypes';
import  {ethers} from 'ethers';
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import erc725schema from '@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json';

// Our static variables
// const SAMPLE_PROFILE_ADDRESS = '0xa907c1904c22DFd37FF56c1f3c3d795682539196';
const RPC_ENDPOINT = 'https://rpc.l16.lukso.network';
const IPFS_GATEWAY = 'https://2eff.lukso.dev/ipfs/';

const provider = new ethers.providers.JsonRpcBatchProvider(RPC_ENDPOINT);
const signer = provider.getSigner();
const config = { ipfsGateway: IPFS_GATEWAY };


/*
 * Try fetching the @param's Universal Profile
 *
 * @param address of Universal Profile
 * @return string JSON or custom error
 */
async function fetchProfile(address: string) {
  try {
    const profile = new ERC725(erc725schema as ERC725JSONSchema[], address, provider, config);
    return await profile.fetchData();
  } catch (error) {
    return console.log('This is not an ERC725 Contract');
  }
}

function App() {
  const [feeds, setFeeds] = useState<IFeedMapping>({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [account, setAccount] = useState('');
  const handleConnect = async () => {
    const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    setLoggedIn(true);
  }
  const addFeed = (feedUrl: string) => {
    fetch(feedUrl)
        .then(res => res.text())
        .then((text)=> {
          var result1 = parse(text, {
            ignoreAttributes: false,
            attributeNamePrefix: "",
            parseAttributeValue: true,
            parseNodeValue: true
          });
          setFeeds({[feedUrl]: result1.rss, ...feeds});
        });
  }
  useEffect(() => {
    if (account) {
      fetchProfile(account).then((profileData) =>
        console.log(JSON.stringify(profileData, undefined, 2)),
      );
    }
  }, [account])
    // if any feed is in the user profile, add it to the feeds state
  console.log('feeds', feeds);
  return (
    <div className="flex flex-row App">
      <aside className="w-64 h-full absolute fixed" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-full fixed">
            <ul className="space-y-2">
              <li>
                  <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link className="ml-3" to={"/"}>Home</Link>
                  </a>
              </li>
              <li>
                  <button type="button" className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">Feeds</span>
                    <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">{Object.keys(feeds).length}</span>
                  </button>
                  <ul id="dropdown-example" className="py-2 space-y-2">
                    {Object.keys(feeds).map((feedUrl: string) => {
                      return (
                        <li>
                          <a href="#" className=""></a>
                          <Link className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" to={`/feed/${encodeURIComponent(feedUrl)}`}>{feeds[feedUrl].channel.title}</Link>
                        </li>
                      );
                    })}
                  </ul>
              </li>
              {loggedIn &&
                <li>
                  <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
                  </a>
              </li>
              }
              {!loggedIn &&
                <li>
                  <a onClick={handleConnect} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">Connect</span>
                  </a>
              </li>
              }
            
            </ul>
        </div>
      </aside>
      <div className="app-header basis-3/4 ml-64">
        <Routes>
          <Route path="/" element={<Home addFeed={addFeed} />} />
          <Route path="/feed/:feedId" element={<FeedId feeds={feeds}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
