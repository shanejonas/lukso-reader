/* eslint-disable jsx-a11y/anchor-is-valid */

// react component for home
import { Link } from "react-router-dom";
import Logo from "./Logo";
import NavigationLink from "./NavigationLink";

interface IProps {
  onClick: () => void;
  loggedIn: boolean;
}

const Home = (props: IProps) => {
  return (
    <div className="App-header mt-20 text-center w-full">
      <div className="mx-auto w-10/12">
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
          <a target="_blank" href="https://www.youtube.com/watch?v=HgEaQPckY3o" className="absolute -bottom-6 px-8 py-3 text-white bg-gray-900 hover:bg-gray-600 rounded-full cursor-pointer no-underline" rel="noreferrer">Watch the Video</a>
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
      <footer className="p-4 bg-white sm:p-6 dark:bg-gray-900">
        <div className="md:flex md:justify-between relative">
                <NavigationLink className={"no-underline inline align-middle"} to={"/"}>
                  <Logo /> 
                  <span className="text-white absolute text-xl font-semibold ml-2">Lukso Reader</span>
                </NavigationLink>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                    <ul className="text-gray-600 dark:text-gray-400">
                        <li className="mb-4">
                            <a target="_blank" href="https://docs.lukso.tech/guides/browser-extension/install-browser-extension/" className="hover:underline " rel="noreferrer">UP Browser Extension Installation</a>
                        </li>
                        <li className="mb-4">
                            <a target="_blank" href="https://docs.lukso.tech/guides/browser-extension/create-a-universal-profile" className="hover:underline " rel="noreferrer">ERC725Y JSON Schema</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">More</h2>
                    <ul className="text-gray-600 dark:text-gray-400">
                        <li className="mb-4">
                            <a target="_blank" href="https://lukso.network/" className="hover:underline " rel="noreferrer">Lukso Website</a>
                        </li>
                        <li>
                            <a target="_blank" href="https://lukso.network/hackathon" className="hover:underline" rel="noreferrer">Lukso Build Up #1 Hackathon</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">2022 <a href="https://shanejonas.net" className="hover:underline">Shane Jonas</a>
            </span>
            <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                <a href="https://twitter.com/shanejonas" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                    <span className="sr-only">Twitter page</span>
                </a>
                <a href="https://github.com/shanejonas/lukso-reader" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                    <span className="sr-only">GitHub account</span>
                </a>
            </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;