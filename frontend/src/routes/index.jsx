import { useRoutes } from 'react-router-dom';

import { Landing } from '../features/landing';
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmail, auth } from "../lib/firebase";

import { protectedRoutes } from './protected';

// Renders landing page component when user is not logged in.
export const AppRoutes = () => {
  const [user, loading, error] = useAuthState(auth);
  
  const routes = user ? protectedRoutes : [{ path: '/', element: <Landing /> }];
  return <>{useRoutes(routes)}</>;
};