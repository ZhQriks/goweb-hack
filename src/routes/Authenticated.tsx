import React from 'react';

import Home from 'pages/public/home/Home';
import { Route, Routes } from 'react-router-dom';
import PublicLayout from 'routes/layouts/PublicLayout';

interface IRouteMap {
  [route: string]: JSX.Element;
}

export const authenticatedRoutes: IRouteMap = {
  '/': <Home />,
};

const Authenticated = (): JSX.Element => {
  return (
    <PublicLayout>
      <Routes>
        {Object.keys(authenticatedRoutes).map(path => (
          <Route key={path} path={path} element={authenticatedRoutes[path]} />
        ))}
      </Routes>
    </PublicLayout>
  );
};

export default Authenticated;
