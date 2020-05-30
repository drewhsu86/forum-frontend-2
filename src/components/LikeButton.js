import React from 'react'
// I imported like and cancelLike from api 
// They already seem to use the endpoints I need (like and clearLikes)
import { like, cancelLike, dislike } from '../api';

export default function LikeButton(props) {
  // we need to do the following control flow:
  // if not logged in, return null
  // because people need to log in to do any backend requests 
  // if logged in, show whether this user liked it or not 
  // if liked, make it an unlike button, and vice versa 

  // when not logged in, username is null 
  // as I need more props I think maybe a redesign of Post 
  // where it gets the post object might be better 
  const username = props.username
  const postId = props.postId
  const forceUpdate = props.forceUpdate

  // I considered adding the state here or in Post
  // but Post doesn't have any other states for the post anyway
  // the liked state should be dependent on myVote from the post object initially and then we can update it as we press the button 
  // because I don't want to do the get call for the thread after
  // doing the post call for /like or /clearLikes
  const liked = props.myVote

  async function handleClick(opt) {
    // I write a click handler that lets you choose 2 options 
    // both like and cancelLike take in postId then username as params
    try {
      let res
      if (opt === "like") {
        res = await like(postId, username)
      } else if (opt === "unlike") {
        res = await cancelLike(postId, username)
      } else if (opt === "dislike") {
        res = await dislike(postId, username)
      }

      console.log(res)
      forceUpdate()
    } catch (er) {
      // for this simple app I don't want to process 
      // any errors for the render I just want to 
      // read them in the console 
      console.log(er)
    }

  }

  // I used buttons with my icons because I like the appearance 
  // (even though the app is bare-bones) but the styling can be 
  // continuously improved as the app is worked on further 
  if (!username) {
    return null
  } else if (liked) {
    return (
      <button onClick={() => handleClick('unlike')}>
        Clear { liked === 1 ? <i class="fas fa-thumbs-up"></i> : <i class="fas fa-thumbs-down"></i>} ?
      </button>
    )
  } else {
    return (
      <span>
        <button onClick={() => handleClick('like')}>
          <i class="far fa-thumbs-up"></i>
        </button>

        <button onClick={() => handleClick('dislike')}>
          <i class="far fa-thumbs-down"></i>
        </button>
      </span>
    )
  }
}
