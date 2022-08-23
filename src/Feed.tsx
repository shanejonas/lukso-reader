import sanitizeHtml from 'sanitize-html';
import { IFeed, IItem } from './FeedTypes';

interface IProps {
  feed: IFeed;
}

// an rss react feed component
const Feed = (props: IProps) => {
  if (!props.feed) {
    return <div>No Feed Loaded...</div>;
  }
  return (
    <div>
      <div className="shadow sm:rounded-md sm:overflow-hidden p-6 m-10">
        <a target="_blank" href={props.feed.channel.link}><h1 className="text-3xl mb-6">{props.feed.channel.title}</h1></a>
        <p className='text-xs'>{props.feed.channel.description}</p>
      </div>
      <ul className="list-none max-w-7xl mx-auto">
        {props.feed.channel.item.map((item: IItem) => (
          <li key={item.link} className="justify-between items-center border-b-2 border-gray-100  px-4 sm:px-6 pt-6 pb-6">
            <div >
              <a target="_blank" href={item.link}><h3 className="text-2xl pb-6">{item.title}</h3></a>
            </div>
            <div>
              <div className='flex pb-6'>
                {(item["itunes:image"] || item["media:thumbnail"]) && <img width={150} height={150} src={item["itunes:image"]?.href || item["media:thumbnail"].url} alt={item.title} className="pr-5"/>}
                <div dangerouslySetInnerHTML={{__html:
                  sanitizeHtml(item.description, {
                    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'img', 'svg'],
                    allowedAttributes: {
                      a: ['href', 'target'],
                      img: ['src', 'height', 'alt', 'width']
                    },
                    allowedSchemesAppliedToAttributes: [ 'href', 'src'],
                    allowedSchemes: [ 'http', 'https', 'data' ],
                    selfClosing: [ 'img' ]
                  })
                }}></div>
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