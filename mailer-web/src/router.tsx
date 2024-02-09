import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/pages/layout/root-layout.tsx'
import { Auth } from './pages/Auth'
import { Register } from './pages/Register'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Register />
      },
      {
        path: '/auth',
        element: <Auth />
      },
    ]
  }
])