import MainLayout from '@/layouts/MainLayout'
import RegisterLayout from '@/layouts/RegisterLayout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Profile from '@/pages/Profile'
import Register from '@/pages/Register'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

export default function useRouteElements() {
  const isAuthenticated = true

  function ProtectedRoutes() {
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
  }

  function RejectedRoutes() {
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
  }

  const routeElement = useRoutes([
    {
      path: '',
      element: <RejectedRoutes />,
      children: [
        {
          path: '/login',
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: '/register',
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '/',
      index: true,
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoutes />,
      children: [
        {
          path: '/profile',
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    }
  ])
  return routeElement
}
