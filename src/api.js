import * as axios from "axios";
import React from "react";
import globalHook from "use-global-hook";

const uri =
  process.env.REACT_APP_API_URI ||
  "https://young-river-54362.herokuapp.com/api";

export function getThreadInfo(threadId) {
  return axios
    .get(`${uri}/thread/${threadId}`, {
      params: { username: currentUsername() }
    })
    .then(
      result => result.data.data,
      error => console.log(error)
    );
}

export function getAllThreads() {
  return axios.get(`${uri}/threads`).then(
    result => result.data.data,
    error => console.log(error)
  );
}

export function newThread(topic, username) {
  return axios.post(`${uri}/newThread`, { topic, username }).then(
    result => result.data.data,
    error => console.log(error)
  );
}

export function newPost(threadId, content, username) {
  return axios.post(`${uri}/newPost`, { threadId, content, username }).then(
    result => result.data.data,
    error => console.log(error)
  );
}

export function like(postId, username) {
  return axios.post(`${uri}/like`, { postId, username }).then(
    result => result.data,
    error => console.log(error)
  )
}

export function dislike(postId, username) {
  return axios.post(`${uri}/dislike`, { postId, username }).then(
    result => result.data,
    error => console.log(error)
  )
}

export function cancelLike(postId, username) {
  return axios.post(`${uri}/clearLikes`, { postId, username }).then(
    result => result.data,
    error => console.log(error)
  )
}

export const useGlobalLoginState = globalHook(
  React,
  {
    username: currentUsername(),
    loggedIn: currentUsername() !== ""
  },
  {
    login: (store, username) => {
      store.setState({ username, loggedIn: true });
      localStorage.setItem("username", username);
    },
    logout: store => {
      store.setState({ username: null, loggedIn: false });
      localStorage.setItem("username", "");
    }
  }
);

function currentUsername() {
  return localStorage.getItem("username");
}