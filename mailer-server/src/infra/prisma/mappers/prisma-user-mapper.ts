import { Prisma, User as PrismaUser } from "@prisma/client";
import { User } from "../../../domain/enterprise/user.ts";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id.ts";

export class PrismaUserMapper {
  static toDomain(user: PrismaUser): User {
    return User.create({
      email: user.email,
      name: user.name,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }, new UniqueEntityId(user.id))
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toValue(),
      email: user.email,
      name: user.name,
      password: user.password,
    }
  }
}