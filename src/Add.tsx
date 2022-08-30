/* eslint-disable jsx-a11y/anchor-is-valid */
// react component for home
import React, { Fragment, useEffect } from "react";
import {parse} from "fast-xml-parser";
import PreviewFeed from "./PreviewFeed";
import { Popover, Transition } from '@headlessui/react'

interface IProps {
  addFeed: (feed: any) => void;
}

const Add = (props: IProps) => {
  const [url, setUrl] = React.useState('');
  const [touched, setTouched] = React.useState<boolean>(false);
  const [feed, setFeed] = React.useState<any>([]);
  const [feedError, setFeedError] = React.useState<string | undefined>();

  useEffect(() => {
    if (url === "") {
      setFeedError('Please enter a valid RSS Feed URL');
      setFeed([]);
      return;
    }
    if (url) {
      setTouched(true);
      setFeedError(undefined);
      fetch(url)
        .then(res => res.text())
        .then(async (text)=> {
          var result1 = parse(text, {
            ignoreAttributes: false,
            attributeNamePrefix: "",
            parseAttributeValue: true,
            parseNodeValue: true
          });
          setFeed(result1);
        })
        .catch((e) => {
          setFeedError(e.message);
          setFeed([]);
        })
    }
  }, [url]);
  return (
    <div className="App-header mx-auto w-full">
      <div className="p-6">
        <div className="relative mb-3">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 text-gray-500 dark:text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <input value={url} placeholder="Enter a valid RSS Feed URL" src='url' onChange={(e) => setUrl(e.target.value)} className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          <button onClick={() => props.addFeed(url)} type="submit" className="text-white absolute right-3 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Feed</button>
        </div>
        <Popover className="relative inline">
          {({ open, close }: {open: boolean, close: any}) => (
            <>
              <Popover.Button
                className={`
                  ${open ? '' : 'text-opacity-90'}
                  mt-3 group inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ml-2`}
              >
                <button className="text-white button rounded-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Examples</button>
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-1/2 z-10 mt-3 -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl bg-white" style={{width: "400px"}}>
                  <div className="overflow-hidden rounded-lg shadow-lg z-1 ring-1 ring-black ring-opacity-5 p-5">
                    <div className="relative w-full">
                      Here are some examples to try out with the RSS Feed URL field:
                      <ul>
                        <li>
                          <a onClick={() => {
                            setUrl('https://anchor.fm/s/add25bb0/podcast/rss');
                            close();
                          }} className="text-blue-500 hover:text-blue-600 cursor-pointer">The Shane & Zane Show</a>
                        </li>
                        <li>
                          <a onClick={() => {
                            setUrl('https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml');
                            close();
                          }} className="text-blue-500 hover:text-blue-600 cursor-pointer">NYT Top Stories</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <br />
        {touched && feedError && 
          <>
            <br />
            <div className="inline">❌ <span className="font-bold">Error: </span>{feedError}
              {feedError.includes('fetch') && !url.includes('https://cors-anywhere.herokuapp.com') && 
                <Popover className="relative inline">
                  {({ open }: {open: boolean}) => (
                    <>
                      <Popover.Button
                        className={`
                          ${open ? '' : 'text-opacity-90'}
                          group z-10 inline-flex items-center text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ml-2`}
                      >
                        <span>ℹ️</span>
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute left-1/2 z-11 mt-3 w-auto -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl bg-white">
                          <div className="overflow-hidden rounded-lg shadow-lg z-1 ring-1 ring-black ring-opacity-5 p-5">
                            <div className="relative w-auto">
                              If you are having issues loading feeds because of CORS, try using the cors-anywhere proxy: <br /> <a className="cursor-pointer" onClick={() => setUrl(`https://cors-anywhere.herokuapp.com/${url}`)}>{`https://cors-anywhere.herokuapp.com/${url}`}</a>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              }
            </div>
          </>
        }
        <h1 className="text-3xl mb-6 mt-7">Preview</h1>
      </div>
      {feed && <PreviewFeed feed={feed.rss} />}
    </div>
  )
}

export default Add;