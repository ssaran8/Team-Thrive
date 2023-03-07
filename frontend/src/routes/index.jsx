import { Navigate, useRoutes } from 'react-router-dom';

import { Landing } from '../features/landing';
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmail, auth } from "../lib/firebase";

import { protectedRoutes } from './protected';

export const AppRoutes = () => {
  const [user, loading, error] = useAuthState(auth);

  const routes = user ? protectedRoutes : [
    { path: '/', element: <Landing /> },
    { path: '*', element: <Navigate to='/' /> }
  ];
  return <>{useRoutes(routes)}</>;
};