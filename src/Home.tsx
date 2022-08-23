// react component for home
import React, { useEffect } from "react";
import {parse} from "fast-xml-parser";
import Feed from "./Feed";

interface IProps {
  addFeed: (feed: any) => void;
}

const Home = (props: IProps) => {
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
    <div className="App-Header">
      <div className="p-6">
        <input src='url' onChange={(e) => setUrl(e.target.value)} className="flex mb-8 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-black border-solid border-2"/>
        <a target="_blank" href={url}><h6 className="text-3xl font-bold underline">{url}</h6></a>
      </div>
      <button onClick={() => props.addFeed(url)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Feed
      </button>
      <h1 className="text-3xl mb-6">Preview</h1>
      {feed && <Feed feed={feed.rss} />}
    </div>
  )
}

export default Home;