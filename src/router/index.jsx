import {
  Route,
  Router,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import AppLayout from '../layouts/AppLayout';
import Home from '../pages/Home';
import React from 'react';

const PostCreate = React.lazy(() => import('../pages/PostCreate'));
const PostShow = React.lazy(() => import('../pages/PostShow'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="/posts/create" element={<PostCreate />} />
      <Route path="/posts/:postId" element={<PostShow />} />
    </Route>
  ),
  {
    basename:
      process.env.NODE_ENV === 'production' ? '/refocus-active-blog' : '/',
  }
);
