import { RouteObject } from 'react-router-dom';
import Student from '../Pages/Students/Strudents';
import Tutors from '../Pages/Tutors/Tutors';
import Results from '../Pages/Results/results';

const routes: RouteObject[] = [
  {
    path: '/student',
    element: <Student />,
  },
  {
    path: '/tutors',
    element: <Tutors />,
  },
  {
    path: '/result',
    element: <Results />,
  },
];

export default routes;
