import { UsersRepository } from "../../src/domain/app/repositories/users-repository.ts";
import { User } from "../../src/domain/enterprise/user.ts";

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async findByEmail(email: string) {
    const user = this.users.find(user => user.email === email)

    if (!user) return null
    return user
  }

  async findById(id: string) {
    const user = this.users.find(user => user.id.toValue() === id) 

    if (!user) return null
    return user
  }

  async create(data: User) {
    this.users.push(data)
  }
}