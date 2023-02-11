import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Dashboard } from '../features/dashboard';

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
      { path: '/', element: <Dashboard />},
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];