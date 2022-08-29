// react component for home
import React, { useEffect } from "react";
import { fetchProfile } from "./App";
import { useParams } from "react-router-dom";


const Profile = (props: any) => {
  const params = useParams();
  const [userProfile, setUserProfile] = React.useState<any>(props.address);

  useEffect(() => {
    if (params.address) {
      fetchProfile(params.address).then(setUserProfile);
    }
  } , [params.address]);
  console.log('userProfile', userProfile);


  return (
    <div className="App-header mx-auto w-full">
      <code>
        <pre>
          {JSON.stringify(userProfile, null, 4)}
        </pre>
      </code>
      {/* <div className="p-6">
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
      {feed && <PreviewFeed feed={feed.rss} />} */}
    </div>
  )
}

export default Profile;