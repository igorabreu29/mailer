import { api } from "@/lib/api";

interface ProfileResponse {
  user: {
    id: string
    name: string
    email: string
    password: null
    createdAt: Date | undefined
    updatedAt: Date | undefined
  }
}

export async function profile({ token }: { token: string }): Promise<ProfileResponse> {
  const user = await api.get<ProfileResponse>('/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return user.data
}