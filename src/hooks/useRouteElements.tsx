import { AppContext } from '@/contexts/app.context'
import MainLayout from '@/layouts/MainLayout'
import RegisterLayout from '@/layouts/RegisterLayout'
// import Login from '@/pages/Login'
import ProductList from '@/pages/ProductList'
// import Register from '@/pages/Register'
import path from '@/constants/path'
import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductDetail from '@/pages/ProductDetail'
import UserLayout from '@/pages/User/layouts/UserLayout'
import ChangePassword from '@/pages/User/pages/ChangePassword/ChangePassword'
import HistoryPurchase from '@/pages/User/pages/HistoryPurchase/HistoryPurchase'
import Profile from '@/pages/User/pages/Profile/Profile'
import NotFoundPage from '@/pages/404'
import Test from '@/pages/todo'
import Video from '@/components/Video'

// Import Component
const Login = lazy(() => import("@/pages/Login"))
const Register = lazy(() => import("@/pages/Register"))

export default function useRouteElements() {
  const { isAuthenticated } = useContext(AppContext)

  function ProtectedRoutes() {
    return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
  }

  function RejectedRoutes() {
    return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
  }

  const routeElement = useRoutes([
    {
      path: '',
      element: <RejectedRoutes />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: "todos",
      index: true,
      element: (
        <Test />
      )
    },
    {
      path: "/video",
      index: true,
      element: (
        <Video />
      )
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoutes />,
      children: [
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: (
                <Suspense>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: path.changePassword,
              element: (
                <Suspense>
                  <ChangePassword />
                </Suspense>
              )
            },
            {
              path: path.historyPurchase,
              element: (
                <Suspense>
                  <HistoryPurchase />
                </Suspense>
              )
            },
          ]
        },
      ]
    },
    {
      path: "*",
      element: (
        < NotFoundPage />
      )
    }
  ])
  return routeElement
}
