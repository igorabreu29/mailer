import { api } from "@/lib/api";
import { RegisterInformData } from "@/pages/Register";

export async function register(data: RegisterInformData) {
  const { email, name, password } = data

  return await api.post('/register', {
    name,
    email,
    password
  })
}