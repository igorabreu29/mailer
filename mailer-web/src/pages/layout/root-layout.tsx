import { NavLink, Outlet } from 'react-router-dom'

export function RootLayout() {
  return (
    <div className="nottext-white notflex notmin-h-screen notflex-col notbg-zinc-950">
      <header className="notflex notjustify-end notpy-6 notpx-8 notgap-4">
        <NavLink to={'/'}>
          Register
        </NavLink>
        <NavLink to={'/auth'}>
          Authenticate
        </NavLink>
      </header>

      <div className='notflex notflex-col w-full notpx-20'>
        <Outlet />
      </div>
    </div>
  )
}