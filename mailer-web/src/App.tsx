import { router } from "./router";
import { RouterProvider } from 'react-router-dom'

import { QueryClientProvider } from '@tanstack/react-query'
import { client } from "./lib/client";

import { Toaster } from 'sonner'

export default function App() {
  return (
    <>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster richColors />
    </>
  )
}