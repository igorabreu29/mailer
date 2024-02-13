import { AccountMenu } from "@/components/account-menu"
import { Profile } from "@/components/profile"
import Cookies from "js-cookie"
import { useEffect } from "react"
import { useNavigate, Outlet } from "react-router-dom"

export function ProtectedLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = Cookies.get('auth')

    if (!token) {
      navigate('/auth')
    }
  }, [navigate])

  return (
    <div>
      <header className="notp-2 notflex notjustify-between notitems-center nottext-white">
        <Profile />
        <AccountMenu />
      </header>

      <Outlet />
    </div>
  )
}