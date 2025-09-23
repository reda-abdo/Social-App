import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { authContext } from '../contexts/authContext';

export default function ProtuctedRoute({ children }) {
    //    let isLoggedin=localStorage.getItem("token") !=null;

    const { isLoggedIn } = useContext(authContext)

    return isLoggedIn ? children : <Navigate to={"/login"} />

}
