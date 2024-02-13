import { useProfile } from "@/hooks/useProfile"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { Skeleton } from "./ui/skeleton"

export function Profile() {
  const navigate = useNavigate()

  function handleSignOut() {
    Cookies.remove('auth')
    navigate('/auth')
  }

  const token = Cookies.get('auth') as string
  const { user, isLoading } = useProfile(token)

  return (
    <div className='notflex notitems-center notjustify-center notgap-2'>
      <div className='notw-6 noth-6 notbg-zinc-700 notrounded-full' />
      {isLoading ? (
        <>
          <Skeleton className="notw-12 noth-8" />
          <Skeleton className="notw-12 noth-8" />
        </>
      ) : (
        <div className='notflex notflex-col notitems-start'>
          <span className='nottext-sm'>{user?.name}</span>
          <span className='nottext-xs'>{user?.email}</span>
          <button className="nottext-xs nottext-red-500" onClick={handleSignOut}>Quero sair</button>
        </div>
      )}
    </div>
  )
}