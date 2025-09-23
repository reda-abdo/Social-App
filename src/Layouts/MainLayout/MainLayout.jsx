import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Component/post/Navbar'
import Footer from '../../Component/post/Footer'

export default function MainLayout() {
  return (<>

    <Navbar/>
    <div className="container">
        <Outlet/>
    </div>
    <Footer/>
  </>
  )
}
