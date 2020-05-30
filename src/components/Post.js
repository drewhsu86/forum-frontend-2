import React from "react";
import LikeButton from './LikeButton'

export function Post(props) {

  const post = props.post

  return (
    <div className="post">
      <span className="post-author">{post.author}</span>
      <span className="post-content">{post.content}</span>

      {/*   
            // here I want to add a like button
            // if the user hasn't liked it yet it lets you like the post 
            // if the user has liked it already, it should let you unlike the post 
            // if you are not logged in it should not show 
      */}
      <span className="post-content"> &nbsp; This post has {post.likeCount} Likes and {post.dislikeCount} dislikes! &nbsp; </span>
      <LikeButton
        username={props.username}
        postId={post.id}
        myVote={post.myVote}
        forceUpdate={props.forceUpdate}
      />

    </div>
  );
}
