// react component for home
import Feed from "./Feed";
import { useParams } from "react-router-dom";
import { IFeed, IFeedMapping } from "./FeedTypes";

interface IProps {
  feeds: IFeedMapping;
}

const FeedId = (props: IProps) => {
  let params: any = useParams();
  const feed: IFeed = props.feeds[decodeURI(params.feedId)];

  return (
    <div className="App-Header w-full mx-auto max-w-screen-xl">
      {feed && <Feed feed={feed} />}
    </div>
  )
}

export default FeedId;