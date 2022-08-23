// react component for home
import React, { useEffect } from "react";
import {parse} from "fast-xml-parser";
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
    <div className="App-Header">
      <h1 className="text-3xl mb-6">Feed</h1>
      {feed && <Feed feed={feed} />}
    </div>
  )
}

export default FeedId;