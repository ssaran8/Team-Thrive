import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { MainLayout } from '../components/Layout';

import { Dashboard } from '../features/dashboard';
import { Calendar } from '../features/calendar';
import { Profile } from '../features/profile';
import { Settings } from '../features/settings';
import { Social } from '../features/social';
import { Rewards } from '../features/rewards';

import { useState, createContext } from 'react';

export const TasksContext = createContext({
  tasks: [],
  setTasks: () => {}
});

const App = () => {
  const [tasks, setTasks] = useState([]);

  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            spinner...?
          </div>
        }
      >
        <TasksContext.Provider value={{tasks, setTasks}}>
          <Outlet />
        </TasksContext.Provider>
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/rewards', element: <Rewards /> },
      { path: '/social', element: <Social /> },
      { path: '/settings', element: <Settings /> },
      { path: '/calendar', element: <Calendar /> },
      { path: '/profile', element: <Profile /> },
      { path: '/', element: <Dashboard />},
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];