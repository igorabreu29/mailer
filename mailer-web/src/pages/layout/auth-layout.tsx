import { Header } from '@/components/header'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div>
      <Header />

      <div className='notflex notflex-col w-full notpx-20'>
        <Outlet />
      </div>
    </div>
  )
}