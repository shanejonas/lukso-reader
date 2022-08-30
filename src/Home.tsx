/* eslint-disable jsx-a11y/anchor-is-valid */

// react component for home
import { Link } from "react-router-dom";

interface IProps {
  onClick: () => void;
  loggedIn: boolean;
}

const Home = (props: IProps) => {
  return (
    <div className="App-header mt-20 mx-auto text-center">
      <div>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">Lukso RSS Feed Reader Dapp</h1>
        <div className="text-base text-black">This is an RSS reader that stores its feed data via ERC725Y on the lukso chain.</div>
        {
          props.loggedIn 
          ? <span className="text-base bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Add a new RSS feed stored on chain.</span>
          : <span className="text-base bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Click connect to log in</span>
        }
      </div>
      <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center mt-3">
        {
          props.loggedIn 
          ?  <Link to={"/add"} className="px-8 py-3 text-white bg-blue-600 hover:bg-gray-600 rounded-full cursor-pointer mr-5 no-underline">Add Feed</Link>
          :  <a onClick={props.onClick} className="px-8 py-3 text-white bg-blue-600 hover:bg-gray-600 rounded-full cursor-pointer mr-5 no-underline">Connect</a>
        }
        <a target="_blank" href="https://github.com/shanejonas/lukso-reader" className="px-8 py-3 text-white bg-gray-900 hover:bg-gray-600 rounded-full cursor-pointer no-underline" rel="noreferrer">Learn More</a>
      </div>
      <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center mt-20 relative">
        <img width="720" src={process.env.PUBLIC_URL + '/feedreader_screenshot.png'} alt="feedreader screenshot"/>
        <a target="_blank" href="x" className="absolute -bottom-6 px-8 py-3 text-white bg-gray-900 hover:bg-gray-600 rounded-full cursor-pointer no-underline" rel="noreferrer">Watch the Video</a>
      </div>
      <div className="text-base text-center max-w-xs mx-auto sm:max-w-none mt-20">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter text-center">Tech used</h1>
        <div className="mt-10 mb-20">This is the tech used for this project.</div>

        <div className="flex">
          <div className="flex mt-10 w-1/2">
            <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
              <h3 className="text-4xl font-extrabold mb-3">RSS Feed</h3>
              <p className="text-xl text-gray-600">RSS Feeds power a lot of the internet. Reusing RSS feeds bring in a lot of usecases.</p>
              <ul className="mt-5">
                <li>
                  News Feeds
                </li>
                <li>
                  Podcasts
                </li>
                <li>
                  Blogs
                </li>
                <li>
                  Video Feeds
                </li>
              </ul>
            </div>
          </div>
          <div className="flex -mt-10 w-1/2">
            <img className="md:max-w-none mx-auto rounded" src={process.env.PUBLIC_URL + '/rss_feed.png'} width="400" alt="Features bg" />
          </div>
        </div>

        <div className="flex">
          <div className="flex w-1/2">
            <img className="md:max-w-none mx-auto rounded" src={process.env.PUBLIC_URL + '/ERC725Schema.png'} width="400" alt="Features bg" />
          </div>
          <div className="flex mt-14 w-1/2">
            <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
              <h3 className="text-4xl font-extrabold mb-3">ERC725Y</h3>
              <p className="text-xl text-gray-600">ERC725Y is a spec to store data on-chain. It is also used in the Universal Profile spec.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;