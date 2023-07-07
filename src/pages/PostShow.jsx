import React, { useEffect, useMemo, useState } from 'react';
import { usePostData, usePostDispatch } from '../context/PostContext';
import { useNavigate, useParams } from 'react-router-dom';
import authorImg from '../assets/images/author_icon.png';
import './PostShow.css';
import commentIcon from '../assets/images/comment_icon.png';
import PostRating from '../components/PostRating';
import TextArea from '../components/common/TextArea';
import { useForm } from 'react-hook-form';
import HeartIcon from '../components/common/HeartIcon';
import { numberFormat } from '../utils';
import LazyImg from '../components/common/LazyImg';
import noImage from '../assets/images/post-img/no-image-available.png';

function AddCommentForm({ postId }) {
  const form = useForm();
  const { register, watch, handleSubmit, reset } = form;
  const postDispatch = usePostDispatch();
  const [watchComment] = watch(['comment']);
  const commentLengthAllowed = watchComment?.length > 6;
  const onSubmitHandler = data => {
    postDispatch({ type: 'addComment', payload: [postId, data.comment] });
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="flex flex-col gap-[10px]">
        <TextArea
          className={`web-basic-b2-regular ${
            commentLengthAllowed && 'text-dark-midnight-blue'
          } py-[16px] px-[20px]`}
          {...register('comment', { required: true })}
        ></TextArea>
        <div className="flex justify-end">
          <button
            disabled={!commentLengthAllowed}
            className="btn-rect btn-active w-full md:w-[210px]"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
}

function Comments({ comments, postId }) {
  const postDispatch = usePostDispatch();
  const [limit, setLimit] = useState(2);
  const LIMIT_INC = 6;
  const isShowMore = comments.length > limit;

  const filteredComments = useMemo(() => {
    if (!isShowMore) return comments;
    const list = [...comments];
    list.length = limit;
    return list;
  }, [comments, limit]);

  const onLikedHandler = idx => () => {
    postDispatch({ type: 'likeComment', payload: [postId, idx] });
  };

  const onShowMoreHandler = () => {
    if (comments.length - limit > LIMIT_INC)
      return setLimit(l => l + LIMIT_INC);
    return setLimit(l => l + (comments.length - limit));
  };

  return (
    <div className="Comments flex flex-col gap-[11px]">
      {filteredComments.map((comment, idx) => (
        <div key={idx}>
          <div className="flex gap-[10px]">
            <div className="min-w-[36px]">
              <img
                className="w-[36px] h-[36px] rounded-full"
                src={commentIcon}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-[10px] ">
              <span className="author">{comment.author}</span>
              <span className="text">{comment.text}</span>
              <div className="flex gap-[15px]">
                <small>{comment.date}</small>
                <div className="flex items-center w-[50px]">
                  <button onClick={onLikedHandler(idx)}>
                    <HeartIcon
                      className={`w-[24px] flex items-center justify-center ${
                        comment.isLiked
                          ? 'fill-royal-blue'
                          : 'stroke-slate-blue'
                      }`}
                    />
                  </button>
                  <small>{numberFormat(comment.likes)}</small>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-pale-blue-gray border-solid mt-[20px]"></div>
        </div>
      ))}
      {isShowMore && (
        <div>
          <button className="btn btn-hover" onClick={onShowMoreHandler}>
            Show more
          </button>
        </div>
      )}
    </div>
  );
}

function PostShow() {
  const posts = usePostData();
  const navigate = useNavigate();
  const { postId } = useParams();
  const post = useMemo(() => {
    return posts.find(post => post.id === Number(postId));
  }, [postId, posts]);

  useEffect(() => {
    if (post) return;
    navigate('/');
  }, [post]);

  return (
    <div className="PostShow flex flex-col-reverse lg:flex-row gap-[20px] md:gap-[40px]">
      <div className="w-full lg:w-[590px]">
        <h2 className="w-[246px] md:w-auto">{post?.title}</h2>
        <div className="flex items-center mt-[20px]">
          <img
            className="w-[24px] h-[24px] rounded-full mr-[5px]"
            src={authorImg}
            alt=""
          />
          <small className="mr-[20px] text-center">{post?.author}</small>
          <small className="text-center">{post?.date}</small>
        </div>
        <p className="mt-[40px]">{post?.text}</p>

        <PostRating
          className="post-rating mt-[20px]"
          postId={Number(postId)}
          comments={Number(post?.comments.length)}
          groupWidth="50px"
          isLiked={post.isLiked}
          likes={post.likes}
        />
        <AddCommentForm postId={Number(postId)} />
        <div className="border-t border-pale-blue-gray border-solid mt-[47px] mb-[40px]"></div>
        <h3 className="comments-title mb-[20px]">Comments:</h3>
        <Comments postId={Number(postId)} comments={post?.comments || []} />
      </div>
      <div className="w-full lg:w-[410px] h-[165px] md:h-[320px] rounded-[10px] overflow-hidden translate-y-0 lg:translate-y-[-64px]">
        <LazyImg className="w-full h-full" src={post.image ?? noImage} alt="" />
      </div>
    </div>
  );
}

export default PostShow;
