import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import DashboardLayout from '@/pages/DashboardLayout'

import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import DahsboardPage from '@/pages/DahsboardPage'
import UserProfilePage from '@/pages/UserProfilePage'
import VerifyEmailPage from '@/pages/VerifyEmailPage'
import ResendEmailPage from '@/pages/ResendEmailPage'
import ErrorPage from '@/pages/ErrorPage'

import { authGuard, unAuthGuard } from '@/utils/auth'
import { dashboardLoader } from '@/utils/dashboardLoader'
import { verifyEmailLoader } from '@/utils/verifyEmailLoader'
import { userProfileLoader } from '@/utils/userProfileLoader'

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
      {
        path: 'user-profile',
        element: <UserProfilePage />,
        loader: userProfileLoader,
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
  {
    path: '/verify-email/:emailVerifyId',
    element: <VerifyEmailPage />,
    loader: verifyEmailLoader,
  },
  {
    path: '/resend-email',
    element: <ResendEmailPage />,
    errorElement: <ErrorPage />,
    loader: unAuthGuard,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
