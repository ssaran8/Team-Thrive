import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { MainLayout } from '../components/Layout';

import { Dashboard } from '../features/dashboard';
import { Calendar } from '../features/calendar';
import { Profile } from '../features/profile';


const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            spinner...?
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/calendar', element: <Calendar /> },
      { path: '/profile', element: <Profile /> },
      { path: '/', element: <Dashboard />},
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];