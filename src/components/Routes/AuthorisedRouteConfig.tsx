import React, { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import PrivateRoute from './PriveateRoute';

// Lazy loaded components
const Student = lazy(() => import('../Pages/Students/Strudents'));
const Tutors = lazy(() => import('../Pages/Tutors/Tutors'));
const Results = lazy(() => import('../Pages/Results/results'));

const withSuspense = (Component: React.ReactElement) => (
  <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
    {Component}
  </Suspense>
);

const routes: RouteObject[] = [
  {
    path: '/student',
    element: withSuspense(
      <PrivateRoute>
        <Student />
      </PrivateRoute>
    ),
  },
  {
    path: '/tutors',
    element: withSuspense(
      <PrivateRoute>
        <Tutors />
      </PrivateRoute>
    ),
  },
  {
    path: '/result',
    element: withSuspense(
      <PrivateRoute>
        <Results />
      </PrivateRoute>
    ),
  },
];

export default routes;
