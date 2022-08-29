// react component for home
import React, { useEffect } from "react";
import {parse} from "fast-xml-parser";
import Feed from "./Feed";
import PreviewFeed from "./PreviewFeed";

interface IProps {
  addFeed: (feed: any) => void;
}

const Add = (props: IProps) => {
  const [url, setUrl] = React.useState('');
  const [feed, setFeed] = React.useState<any>([]);

  useEffect(() => {
    if (url) {
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
        });
    }
  }, [url]);
  return (
    <div className="App-header mx-auto w-full">
      <div className="p-6">
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 text-gray-500 dark:text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <input placeholder="Enter a valid RSS Feed URL" src='url' onChange={(e) => setUrl(e.target.value)} className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          <button onClick={() => props.addFeed(url)} type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Feed</button>
        </div>
        <h1 className="text-3xl mb-6 mt-7">Preview</h1>
      </div>
      {feed && <PreviewFeed feed={feed.rss} />}
    </div>
  )
}

export default Add;