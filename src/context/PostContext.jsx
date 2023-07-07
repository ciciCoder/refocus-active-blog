import React, { createContext, useContext, useReducer, useState } from 'react';
import postData from './../posts.json';
import { dateToday } from '../utils';

const LOCAL_STORAGE_KEY = 'posts';

const PostContext = createContext();
const PostDispatchContext = createContext();

function getLocalPosts() {
  if (localStorage.getItem(LOCAL_STORAGE_KEY))
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  return postData;
}

const setLocalPosts = (() => {
  let timer = null;
  return val => {
    clearTimeout(timer);
    timer = setTimeout(
      () => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(val)),
      100
    );
  };
})();

/**
 * @typedef {{type:'fetch', payload: undefined}} FetchAction
 * @typedef {{type:'store', payload: {image: string, title: string, text: string}}} StoreAction
 * @typedef {{type:'update', payload: PostData}} UpdateAction
 * @typedef {{type:'liked', payload: PostData['id']}} LikedAction
 * @typedef {{
 *  type:'addComment',
 *  payload: [PostData['id'], PostData['comments'][number]['text']]
 * }} AddCommentAction
 * @typedef {{type: 'likeComment', payload: [PostData['id'], number]}} LikeCommentAction
 * @typedef {typeof postData[number] & {image?:string}} PostData
 * @typedef {FetchAction|StoreAction|UpdateAction|LikedAction|AddCommentAction|LikeCommentAction} Action
 * Description
 * @param {PostData[]} state
 * @param {Action} action
 * @returns {PostData}
 */
function postReducer(state, action) {
  switch (action.type) {
    case 'fetch': {
      return getLocalPosts();
    }
    case 'update': {
      const { id, ...updates } = action.payload;
      const newState = state.map(item => {
        if (item.id !== id) return item;
        return { ...item, ...updates };
      });
      setLocalPosts(newState);
      return newState;
    }
    case 'store': {
      const id = state[state.length - 1].id + 1;
      const data = {
        id,
        author: 'Anonymous User',
        date: dateToday(),
        likes: 0,
        isLiked: false,
        comments: [],
        ...action.payload,
      };
      const newState = [...state, data];
      setLocalPosts(newState);
      return newState;
    }
    case 'liked': {
      const id = action.payload;
      const newState = state.map(item => {
        if (item.id !== id) return item;
        const updates = {
          likes: item.isLiked ? item.likes - 1 : item.likes + 1,
          isLiked: !item.isLiked,
        };
        return {
          ...item,
          ...updates,
        };
      });
      setLocalPosts(newState);
      return newState;
    }
    case 'addComment': {
      const [id, text] = action.payload;
      const newState = state.map(item => {
        if (item.id !== id) return item;
        /**@type {PostData['comments'][number]} */
        const comment = {
          author: 'Anonymous',
          date: dateToday(),
          isLiked: false,
          likes: 0,
          text,
        };
        const newItem = { ...item };
        newItem.comments = [...newItem.comments, comment];
        return newItem;
      });
      setLocalPosts(newState);
      return newState;
    }
    case 'likeComment': {
      const [id, commentIndex] = action.payload;
      const newState = state.map(item => {
        if (item.id !== id) return item;
        const newItem = { ...item };
        const comments = [...item.comments];
        const comment = { ...newItem.comments[commentIndex] };
        comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;
        comment.isLiked = !comment.isLiked;
        comments[commentIndex] = comment;
        newItem.comments = [...comments];
        return newItem;
      });
      setLocalPosts(newState);
      return newState;
    }
    default:
      return state;
  }
}

/**
 * Description
 * @returns {PostData[]}
 */
export function usePostData() {
  return useContext(PostContext);
}

/**
 * Description
 * @returns {React.Dispatch<Action>}
 */
export function usePostDispatch() {
  return useContext(PostDispatchContext);
}

/**
 * Description
 * @param {React.ReactNode} {children}
 * @returns {JSX.Element}
 */
export function PostProvider({ children }) {
  const [posts, postDispatch] = useReducer(postReducer, getLocalPosts());

  return (
    <PostDispatchContext.Provider value={postDispatch}>
      <PostContext.Provider value={posts}>{children}</PostContext.Provider>
    </PostDispatchContext.Provider>
  );
}
