// components/Routes/MenuItem.tsx
import { RouteObject } from 'react-router-dom';
import Student from '../Pages/Students/Strudents';
import Tutors from '../Pages/Tutors/Tutors';
import Results from '../Pages/Results/results';
import PrivateRoute from './PriveateRoute';

const routes: RouteObject[] = [
  {
    path: '/student',
    element: (
      <PrivateRoute>
        <Student />
      </PrivateRoute>
    ),
  },
  {
    path: '/tutors',
    element: (
      <PrivateRoute>
        <Tutors />
      </PrivateRoute>
    ),
  },
  {
    path: '/result',
    element: (
      <PrivateRoute>
        <Results />
      </PrivateRoute>
    ),
  },
];

export default routes;
