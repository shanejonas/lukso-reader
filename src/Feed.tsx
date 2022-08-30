import sanitizeHtml from 'sanitize-html';
import he from "he";
import { IFeed, IItem } from './FeedTypes';

interface IProps {
  feed: IFeed;
}

// an rss react feed component
const Feed = (props: IProps) => {
  if (!props.feed) {
    return <div className='text-center'>No Feed Loaded...</div>;
  }
  if (!Array.isArray(props.feed.channel.item)) {
    props.feed.channel.item = [props.feed.channel.item];
  }
  return (
    <div className="Feed mx-auto">
      <div className="shadow sm:rounded-md sm:overflow-hidden p-6 m-10">
        <a target="_blank" href={props.feed.channel.link} rel="noreferrer"><h1 className="text-3xl mb-6">{he.unescape(props.feed.channel.title)}</h1></a>
        <p className='text-xs'>{props.feed.channel.description}</p>
      </div>
      <ul className="list-none mx-auto">
        {props.feed.channel.item.map((item: IItem) => (
          <li key={item.link} className="justify-between items-center border-b-2 border-gray-100  px-4 sm:px-6 pt-6 pb-6 mx-auto">
            <div >
              <a target="_blank" href={item.link} rel="noreferrer"><h3 className="text-2xl">{he.unescape(item.title)}</h3></a>
            </div>
            <div className="text-base">
              {item.pubDate && new Date(item.pubDate).toLocaleDateString()}
            </div>
            <div>
              <div className='flex pb-6'>
                <div>
                  {(item["itunes:image"] || item["media:thumbnail"] || item["media:content"] || item.imageurl) && <img width={150} src={item["itunes:image"]?.href || item["media:thumbnail"]?.url || item["media:content"]?.url || item.imageurl} alt={item.title} className="pr-5 max-w-none"/>}
                </div>
                <div dangerouslySetInnerHTML={{__html:
                  sanitizeHtml(item["content:encoded"] || item.description || "", {
                    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'img', 'svg'],
                    allowedAttributes: {
                      a: ['href', 'target'],
                      img: ['src', 'height', 'alt', 'width']
                    },
                    allowedSchemesAppliedToAttributes: [ 'href', 'src'],
                    allowedSchemes: [ 'http', 'https', 'data' ],
                    selfClosing: [ 'img' ]
                  })
                }} className="mt-6 Feed-Content"></div>
              </div>
              {item.enclosure && <audio controls src={item.enclosure.url}  className="w-full"/>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default Feed;