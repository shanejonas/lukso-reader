import sanitizeHtml from 'sanitize-html';
import { IFeed, IItem } from './FeedTypes';
import he from "he";

interface IProps {
  feed: IFeed;
}

// an rss react feed component
const PreviewFeed = (props: IProps) => {
  if (!props.feed) {
    return <div className='text-center'>No Feed Loaded...</div>;
  }
  console.log(props.feed);
  if (!Array.isArray(props.feed.channel.item)) {
    props.feed.channel.item = [props.feed.channel.item];
  }
  return (
    <div >
      <div className="shadow sm:rounded-md sm:overflow-hidden p-6 ml-10 mr-10">
        <a target="_blank" href={props.feed.channel.link} rel="noreferrer"><h1 className="text-3xl mb-6">{he.unescape(props.feed.channel.title)}</h1></a>
        <p className='text-xs'>{props.feed.channel.description}</p>
      </div>
      <ul className="list-none flex flex-wrap pl-6 pr-6 ml-10 mr-10 mx-auto justify-center">
        {props.feed.channel?.item?.map((item: IItem) => (
          <li key={item.link} className="justify-between items-center border-b-2 border-gray-100  px-4 sm:px-6 pt-6 pb-6 pl-6 pr-6 ml-6 mr-6 mt-6 shadow sm:rounded-md max-w-xs">
            <div>
              <h3 className="text-2xl pb-6">{he.unescape(item.title)}</h3>
            </div>
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
                }} className="w-40 truncate"></div>
            <div className='w-full pb-6'>
              {(item["itunes:image"] || item["media:thumbnail"] || item["media:content"]) && <img width={150} src={item["itunes:image"]?.href || item["media:thumbnail"]?.url || item["media:content"]?.url} alt={item.title} className="pr-5 mx-auto"/>}
            </div>
          </li>
        ))}
      </ul>
      <div className='mb-6'></div>
    </div>
  );
}


export default PreviewFeed;