import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Landing } from '../features/misc'
import { logOut } from '../lib/firebase';


const App = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            spinner...?
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
};

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      // { path: '/calendar', element: <Calendar /> },
      // { path: '/profile', element: <Profile /> },
      { path: '/', element: <>
        you're logged in! 
        <br />
        change me in src/routes/protected.jsx. this should be the dashboard. 
        <br />
        <button onClick={logOut}>logout here</button>
       </> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];