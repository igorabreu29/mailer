import { User } from "@/domain/enterprise/user.ts"

export interface UsersRepository {
  findByEmail: (email: string) => Promise<User | null>
  findById: (id: string) => Promise<User | null>
  create: (data: User) => Promise<void>
}