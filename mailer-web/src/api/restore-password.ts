import { api } from "@/lib/api";

interface RestorePasswordProps {
  email: string
  password: string
}

export async function restorePassword(data: RestorePasswordProps) {
  const { email, password } = data

  return await api.patch(`/restore-password?email=${email}`, {
    password
  })
}