import React from "react";

import { Post } from "./Post";
import { useGlobalLoginState, newPost } from "../api";

export function Thread(props) {
  const [{ username, loggedIn }] = useGlobalLoginState();
  const [newPostContent, setNewPostContent] = React.useState("");

  return (
    <div className="thread">
      <div className="thread-header">
        <span className="thread-author">{props.author}</span>
        <span className="thread-topic">{props.topic}</span>
      </div>
      <div className="thread-posts">
        {props.posts.map(post => {
          // snuck in a console.log here 
          // wanted to see the post ids 
          // also I'm passing username to Post
          // 
          // console.log(post)
          return <Post
            username={username}
            post={post}
            forceUpdate={props.forceUpdate}
          />
        })}
      </div>
      {loggedIn && (
        <form
          onSubmit={e => {
            e.preventDefault();
            newPost(props.id, newPostContent, username).then(props.refreshThread);
          }}
        >
          <div style={{ display: "flex" }}>
            <input
              value={newPostContent}
              onChange={e => {
                e.preventDefault();
                setNewPostContent(e.target.value);
              }}
              style={{ flexGrow: 1, marginRight: 10 }}
            />
            <input type="submit" value="Reply" />
          </div>
        </form>
      )}
    </div>
  );
}
