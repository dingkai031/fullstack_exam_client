import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import DashboardLayout from '@/pages/DashboardLayout'

import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import DahsboardPage from '@/pages/DahsboardPage'
import ErrorPage from '@/pages/ErrorPage'

import { authGuard, unAuthGuard } from '@/utils/auth'
import { dashboardLoader } from '@/utils/dashboardLoader'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    loader: authGuard,
    children: [
      {
        index: true,
        element: <DahsboardPage />,
        loader: dashboardLoader,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
    loader: unAuthGuard,
  },
  {
    path: '/signup',
    element: <SignupPage />,
    loader: unAuthGuard,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
