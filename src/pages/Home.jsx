import React, { useEffect, useMemo, useState } from 'react';
import './Home.css';
import { NavLink } from 'react-router-dom';
import useQuery from '../hooks/useQuery';
import ChatIcon from '../components/common/ChatIcon';
import { numberFormat } from '../utils';
import HeartIcon from '../components/common/HeartIcon';
import { usePostData, usePostDispatch } from '../context/PostContext';
import { FaPlus } from 'react-icons/fa';
import LazyImg from '../components/common/LazyImg';
import PostRating from '../components/PostRating';
import noImage from './../assets/images/post-img/no-image-available.png';

function HomeFilter() {
  const query = useQuery();

  const activeFilter = query.get('favorites');

  return (
    <div className="flex gap-[15px]">
      <NavLink
        className={`btn ${activeFilter ? 'btn-hover' : 'btn-active'}`}
        to="/"
      >
        All posts
      </NavLink>
      <NavLink
        className={`btn ${activeFilter ? 'btn-active' : 'btn-hover'}`}
        to="/?favorites=1"
      >
        Favorites
      </NavLink>
    </div>
  );
}

function HomePosts() {
  const LIMIT_INC = 6;
  const query = useQuery();
  const posts = usePostData();
  const [limit, setLimit] = useState(LIMIT_INC);
  const postDispatch = usePostDispatch();

  const activeFilter = query.get('favorites');

  useEffect(() => {
    setLimit(LIMIT_INC);
  }, [activeFilter]);

  const postsCount = useMemo(
    () =>
      activeFilter ? posts.filter(post => post.isLiked).length : posts.length,
    [posts, activeFilter]
  );
  const showMore = postsCount > limit;

  const filteredPosts = useMemo(() => {
    const list = activeFilter ? posts.filter(post => post.isLiked) : [...posts];
    if (limit < list.length) list.length = limit;
    return list;
  }, [posts, activeFilter, limit]);

  const showMoreHandler = () => {
    if (postsCount - limit < LIMIT_INC) {
      setLimit(l => l + (postsCount - limit));
      return;
    }
    setLimit(l => l + LIMIT_INC);
  };

  // const likePostHandler = post => {
  //   return () => {
  //     postDispatch({
  //       type: 'update',
  //       payload: {
  //         id: post.id,
  //         isLiked: !post.isLiked,
  //         likes: post.isLiked ? post.likes - 1 : post.likes + 1,
  //       },
  //     });
  //   };
  // };

  return (
    <>
      <div className="grid grid-cols-[1] md:grid-cols-2  xl:grid-cols-3 gap-[10px] md:gap-[40px]">
        {filteredPosts.map(post => (
          <article
            key={post.id}
            className="w-[100%] sm:w-[90%] xl:w-[320px] h-[300px] m-auto flex flex-col rounded-[6px]"
          >
            <div className="w-full h-[165px] bg-lavender-gray rounded-t-[6px] overflow-hidden">
              {post.image ? (
                <LazyImg className="w-full h-full" src={post.image} />
              ) : (
                <img
                  src={noImage}
                  className="w-full h-full object-cover"
                  alt=""
                />
              )}
            </div>
            <div className="bg-ghost-white py-[10px] px-[20px] flex flex-col gap-[10px] rounded-b-[6px]">
              <NavLink to={`/posts/${post.id}`}>
                <div className="flex flex-col gap-[5px] min-h-[70.99px]">
                  <h2 className="post-title">{post.title}</h2>
                  <p className="post-text">{post.text}</p>
                </div>
              </NavLink>
              <div>
                <div className="w-full border-t border-t-slate-blue mb-[10px]"></div>
                <div className="flex h-[24px] items-center justify-between">
                  <div className="post-cred">
                    <span>{post.date}</span>
                    <span>.</span>
                    <span>{post.author}</span>
                  </div>
                  <PostRating
                    postId={post.id}
                    className="post-rating"
                    groupWidth="44px"
                    comments={Number(post.comments.length)}
                    likes={post.likes}
                    isLiked={post.isLiked}
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      {showMore && (
        <div className="mt-[40px]">
          <button className="btn-rect" onClick={showMoreHandler}>
            Show more
          </button>
        </div>
      )}
    </>
  );
}

function Home() {
  return (
    <div>
      <div className="Home">
        <div className="flex justify-between">
          <HomeFilter />
          <NavLink
            to="/posts/create"
            className="btn md:btn-rect btn-hover [line-height:initial] md:[line-height:150%]"
          >
            <span className="text-[24px]">+</span>{' '}
            <span className="hidden md:[display:unset]">Add Post</span>
          </NavLink>
        </div>
        <section>
          <HomePosts />
        </section>
      </div>
    </div>
  );
}

export default Home;
