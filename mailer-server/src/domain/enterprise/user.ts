import { Entity } from "../../core/entities/entity.ts"
import { UniqueEntityId } from "../../core/entities/unique-entity-id.ts"

export type Role = 'user' | 'admin'

interface UserProps {
  name: string
  email: string
  password: string
  role?: Role
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

  get role() {
    return this.props.role
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
      role: props.role ?? 'user',
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date()
    }, id)
  }
}