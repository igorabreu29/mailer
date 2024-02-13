import Cookies from "js-cookie"
import { jwtDecode } from 'jwt-decode'

interface User {
  sub: string
  name: string
  email: string
}

export function getUserAuth(): User {
  const token = Cookies.get('auth')

  if (!token) {
    throw new Error("Unauthenticated")
  }

  const user: User = jwtDecode(token)
  return user
}