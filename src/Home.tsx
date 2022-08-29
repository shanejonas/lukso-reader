/* eslint-disable jsx-a11y/anchor-is-valid */

// react component for home
import { Link } from "react-router-dom";

interface IProps {
  onClick: () => void;
  loggedIn: boolean;
}

const Home = (props: IProps) => {
  return (
    <div className="App-header mt-20 mx-auto">
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
    </div>
  );
}

export default Home;