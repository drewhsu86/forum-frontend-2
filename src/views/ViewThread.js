import React from "react";

// I thought about importing like and cancelLike from api 
// here and passing it down but with the time restriction
// better to work simply (so I imported them in LikeButton)
import { getThreadInfo } from '../api';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { Thread } from '../components/Thread';

export function ViewThread(props) {
  const [thread, setThread] = React.useState();
  const loading = thread === undefined;
  // made an update state for rerendering to pass down to LikeButton 
  const [update, setUpdate] = React.useState(Date.now())

  // I added update to the useEffect so that we would refresh the threads (and see the new like counts) whenever an update was forced (we liked or disliked a post)
  React.useEffect(refreshThread, [props.match.params.threadId, update]);

  function refreshThread() {
    getThreadInfo(props.match.params.threadId).then(setThread);
  }
  console.log(thread)

  // make a function to force update 
  function forceUpdate() {
    setUpdate(Date.now())
    console.log('Updated at: ', update)
  }

  if (loading) {
    return <LoadingIndicator />
  } else {
    return <Thread topic={thread.topic} author={thread.author} posts={thread.posts} id={thread.id} refreshThread={refreshThread} forceUpdate={forceUpdate}></Thread>
  }
}