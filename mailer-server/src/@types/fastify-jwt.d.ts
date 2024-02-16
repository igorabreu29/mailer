import { Role } from '@/domain/enterprise/user.ts'
import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      role: Role
    }
  }
}