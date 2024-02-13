import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository.ts'
import { UserAlreadyExistError } from '../errors/user-already-exist-error.ts'
import { RegisterUseCase } from './register-use-case.ts'
import { makeUser } from 'test/factories/make-user.ts'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should not be able to register a user who already exist', async () => {
    const user = makeUser()

    usersRepository.users.push(user)

    const result = await sut.execute({ name: user.name, email: user.email, password: user.password })

    expect(result.value).toBeInstanceOf(UserAlreadyExistError)
    expect(result.value?.message).toEqual('User already exist.')
    expect(usersRepository.users).toHaveLength(1)
  })

  it('should be able to register a user', async () => {
    const user = makeUser()

    const result = await sut.execute({ name: user.name, email: user.email, password: user.password })

    expect(usersRepository.users).toHaveLength(1)
    expect(usersRepository.users[0]).toMatchObject({
      id: {
        value: expect.any(String)
      },
      name: user.name,
      email: user.email,
      password: user.password,
    })
    expect(result.value).toBeNull()
  })
})