import Cookies from "js-cookie";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,  } from "./ui/dialog";
import { useProfile } from "@/hooks/useProfile";

export function AccountMenu() {
  const token = Cookies.get('auth') as string

  const { user } = useProfile(token)

  return (
    <Dialog>
      <DialogTrigger>
        Profile
      </DialogTrigger>
      <DialogContent className="notbg-zinc-800">
        <DialogHeader>
          <DialogTitle>See All Profile Data</DialogTitle>
        </DialogHeader>
        <ul>
          <li>{user?.name}</li>
          <li>{user?.email}</li>
          <li>{user?.createdAt?.toString()}</li>
          <li>{user?.updatedAt?.toString()}</li>
        </ul>
      </DialogContent>
    </Dialog>
  )
}