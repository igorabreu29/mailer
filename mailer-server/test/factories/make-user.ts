import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";
import { User } from "@/domain/enterprise/user.ts";

export function makeUser(
  override: Partial<User> = {},
  id?: UniqueEntityId
) {
  return User.create({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'johnjohn',
    ...override
  }, id)
}