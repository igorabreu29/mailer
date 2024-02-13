import { describe, it, expect, beforeEach } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile.ts'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository.ts'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.ts'
import { makeUser } from 'test/factories/make-user.ts'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.ts'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get user profile use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it ('should not be able to get user profile that not existing', async () => {
    const result = await sut.execute({ id: 'id-not-existing' })

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it ('should be able to get user profile', async () => {
    const user = makeUser({ name: 'John Doe', email: "john@john.com" }, new UniqueEntityId('testing'))
    usersRepository.users.push(user)

    const result = await sut.execute({ id: user.id.toValue() })
    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      user: {
        id: {
          value: 'testing'
        },
        name: user.name,
        email: user.email
      }
    })
  })
})