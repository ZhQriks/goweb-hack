import React from 'react';

import Login from 'pages/public/auth/Login';
import Register from 'pages/public/auth/Register';
import Home from 'pages/public/home/Home';
import News from 'pages/public/news/News';
import { Route, Routes } from 'react-router-dom';
import PublicLayout from 'routes/layouts/PublicLayout';

import NewsDetails from '../pages/public/news/NewsDetails';

interface IRouteMap {
  [route: string]: JSX.Element;
}

export const unauthenticatedRoutes: IRouteMap = {
  '/': <Home />,
  '/guide': <News />,
  '/guide/:guideId': <NewsDetails />,
  '/login': <Login />,
  '/register': <Register />,
};

const Unauthenticated = (): JSX.Element => {
  return (
    <PublicLayout>
      <Routes>
        {Object.keys(unauthenticatedRoutes).map(path => (
          <Route key={path} path={path} element={unauthenticatedRoutes[path]} />
        ))}
      </Routes>
    </PublicLayout>
  );
};

export default Unauthenticated;
