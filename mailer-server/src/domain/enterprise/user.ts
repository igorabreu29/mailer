import { Entity } from "../../core/entities/entity.ts"
import { UniqueEntityId } from "../../core/entities/unique-entity-id.ts"

interface UserProps {
  name: string
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  set password(newPassword) {
    this.props.password = newPassword
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: UserProps, id?: UniqueEntityId) {
    return new User({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date()
    }, id)
  }
}