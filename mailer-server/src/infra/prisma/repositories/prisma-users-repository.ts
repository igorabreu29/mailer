import { UsersRepository } from "@/domain/app/repositories/users-repository.ts"
import { prisma } from "@/infra/lib/prisma.ts"
import { User } from "@/domain/enterprise/user.ts"
import { PrismaUserMapper } from "../mappers/prisma-user-mapper.ts"

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) return null

    const userMapper = PrismaUserMapper.toDomain(user)
    return userMapper
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      }
    })

    if (!user) return null
    return PrismaUserMapper.toDomain(user)
  }

  async create(data: User) {
    const user = PrismaUserMapper.toPrisma(data)
    await prisma.user.create({ data: user })
  }
}