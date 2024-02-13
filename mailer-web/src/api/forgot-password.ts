import { api } from "@/lib/api";
import { ForgotPasswordInformData } from "@/pages/forgot-password";

export async function forgotPassword(data: ForgotPasswordInformData) {
  const { email } = data

  return await api.post('/forgot-password', {
    email,
  })
}