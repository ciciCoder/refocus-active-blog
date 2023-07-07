import React, { useEffect, useMemo } from 'react';
import { usePostData, usePostDispatch } from '../context/PostContext';
import ChatIcon from './common/ChatIcon';
import HeartIcon from './common/HeartIcon';
import { numberFormat } from '../utils';

/**
 * Description
 * @typedef {{
 *  groupWidth:string,
 *  postId:number,
 *  comments:number,
 *  likes:number,
 *  isLiked:boolean,
 * }} PostRatingProps
 * @param {JSX.IntrinsicElements['div'] & PostRatingProps} props
 * @returns {any}
 */
function PostRating(props) {
  const { comments, postId, groupWidth, likes, isLiked, ...attrs } = props;
  const groupStyle = { width: groupWidth };

  return (
    <div {...attrs}>
      <div className="flex items-center" style={groupStyle}>
        <ChatIcon className="w-[24px] flex items-center justify-center" />
        {numberFormat(comments)}
      </div>
      <LikeButton
        postId={postId}
        groupStyle={groupStyle}
        likes={likes}
        isLiked={isLiked}
      />
    </div>
  );
}

/**
 * Description
 * @typedef {{
 *  groupWidth:string,
 *  postId:number,
 *  likes:number,
 *  isLiked:boolean,
 * }} LikeButtonProps
 * @param {LikeButtonProps} props
 * @returns {JSX.Element}
 */
export function LikeButton(props) {
  const { groupWidth, likes, postId, isLiked } = props;
  const postDispatch = usePostDispatch();
  const onLikedHandler = () => {
    postDispatch({ type: 'liked', payload: postId });
  };
  const groupStyle = { width: groupWidth };
  return (
    <div className="flex items-center" style={groupStyle}>
      <button onClick={onLikedHandler}>
        <HeartIcon
          className={`w-[24px] flex items-center justify-center ${
            isLiked ? 'fill-royal-blue' : 'stroke-slate-blue'
          }`}
        />
      </button>
      {numberFormat(likes)}
    </div>
  );
}

export default PostRating;
