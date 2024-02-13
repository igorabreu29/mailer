import { createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from '@/pages/layout/auth-layout'
import { Auth } from './pages/Auth'
import { Register } from './pages/Register'
import { ForgotPassword } from './pages/forgot-password'
import { RestorePassword } from './pages/restore-password'
import { ProtectedLayout } from './pages/layout/protected-layout'
import { Protected } from './pages/protected'

import { Error } from './pages/Error'
import { NotFound } from './pages/404'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Register />
      },
      {
        path: '/auth',
        element: <Auth />
      },
      {
        path: '/forgot',
        element: <ForgotPassword />
      },
      {
        path: '/restore',
        element: <RestorePassword />
      }
    ],
  },
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      {
        path: '/protected',
        element: <Protected />
      }
    ]
  }, 
  {
    path: '*',
    element: <NotFound />
  }
])