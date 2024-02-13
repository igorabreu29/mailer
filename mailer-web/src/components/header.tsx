import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <header className="notp-2 notflex nottext-white">
      {/* <div className='notflex notitems-center notjustify-center notgap-2'>
        <div className='notw-6 noth-6 notbg-zinc-700 notrounded-full' />
          <div className='notflex notflex-col notitems-start'>
            <span className='nottext-sm'>name</span>
            <span className='nottext-xs'>email</span>
            <button className="nottext-xs nottext-red-500">Quero sair</button>
          </div>
      </div> */}
      <div className='notml-auto notw-max notp-1 notspace-x-4'>
        <NavLink to={'/'}>
          Register
        </NavLink>
        <NavLink to={'/auth'}>
          Authenticate
        </NavLink>
      </div>
    </header>
  )
}