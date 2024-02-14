import { Role, User } from "@/domain/enterprise/user.ts";
import { Prisma } from "@prisma/client";

export class UserPresenter {
  static toHTTP(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toValue(),
      name: user.name,
      email: user.email,
      role: user.role as Role,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }
}