import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { authContext } from '../contexts/authContext';
export default function ProtuctrdAuthRoute({ children }) {

  const { isLoggedIn } = useContext(authContext)

  return !isLoggedIn ? children : <Navigate to={'/'} />;

}
