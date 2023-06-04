import RegisterLayout from '@/layouts/RegisterLayout'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import { useRoutes } from 'react-router-dom'

export default function useRouteElements() {
  const routeElement = useRoutes([
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
  ])
  return routeElement
}
