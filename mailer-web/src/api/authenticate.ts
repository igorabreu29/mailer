import { api } from "@/lib/api";
import { AuthenticateInformData } from "@/pages/Auth";

export async function authenticate(data: AuthenticateInformData) {
  const { email, password } = data

  const user = await api.post('/auth', {
    email,
    password
  })

  return user.data
}