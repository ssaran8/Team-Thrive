import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { MainLayout } from '../components/Layout';

import { Dashboard } from '../features/dashboard';
import { Calendar } from '../features/calendar';
import { Settings } from '../features/settings';
import { Social } from '../features/social';

import { useState, createContext } from 'react';

export const TasksContext = createContext({
  tasks: [],
  setTasks: () => {}
});

// Renders Thrive application when user is logged in.
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
      { path: '/social', element: <Social /> },
      { path: '/settings', element: <Settings /> },
      { path: '/calendar', element: <Calendar /> },
      { path: '/', element: <Dashboard />},
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];