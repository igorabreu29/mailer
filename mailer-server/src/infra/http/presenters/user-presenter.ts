import { User } from "@/domain/enterprise/user.ts";

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toValue(),
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }
}