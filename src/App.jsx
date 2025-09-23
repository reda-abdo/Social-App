import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './Layouts/AuthLayout/AuthLayout'
import MainLayout from './Layouts/MainLayout/MainLayout'
import Register from './Pages/Register/Register'
import FeedPage from './Pages/FeedPage/FeedPage'
import PostDetailsPage from './Pages/post-detailsPage/post-details'
import PrpfilePage from './Pages/ProfilePage/PrpfilePage'
import NotfoundPage from './Pages/NotfoundPage/NotfoundPage'
import ProtuctedRoute from './ProtectedRoutes/ProtuctedRoute'
import ProtuctrdAuthRoute from './ProtectedRoutes/ProtuctrdAuthRoute'
import Login from './Pages/Login/Login'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


export const queryClient = new QueryClient


const router = createBrowserRouter([
  {
    path: '', element: <AuthLayout />, children: [
      { path: 'rigister', element: <ProtuctrdAuthRoute><Register /></ProtuctrdAuthRoute> },
      { path: 'login', element: <ProtuctrdAuthRoute> <Login /></ProtuctrdAuthRoute> }
    ]
  },
  {
    path: '', element: <MainLayout />, children: [
      { index: true, element: <ProtuctedRoute><FeedPage /></ProtuctedRoute> },
      { path: 'post-details/:id', element: <ProtuctedRoute><PostDetailsPage /></ProtuctedRoute> },
      { path: 'profile', element: <ProtuctedRoute><PrpfilePage /></ProtuctedRoute> },
      { path: '*', element: <NotfoundPage /> }

    ]
  }
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RouterProvider router={router} />

    </QueryClientProvider>

  )
}

export default App
