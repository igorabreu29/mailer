import { describe, it, expect, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate-use-case.ts'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.ts'
import { makeUser } from 'test/factories/make-user.ts'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter.ts'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository.ts'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.ts'
import { FakeHasher } from 'test/cryptography/fake-hashser.ts'
import { WrongCredentialsError } from '../errors/wrong-credentials-error.ts'

let usersRepository: InMemoryUsersRepository
let fakeEncrypter: FakeEncrypter
let fakeHasher: FakeHasher
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    fakeEncrypter = new FakeEncrypter()
    fakeHasher = new FakeHasher()
    sut = new AuthenticateUseCase(usersRepository, fakeEncrypter, fakeHasher)
  })

  it('should not be able to authenticate a user with different email', async () => {
    const user = makeUser()
    usersRepository.users.push(user)

    const result = await sut.execute({ email: 'invalid-email', password: user.password })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
    expect(result.value).toMatchObject({
      message: 'Credentials are not valid.'
    })
  })

  it('should not be able to authenticate a user with diffent password', async () => {
    const user = makeUser()

    usersRepository.users.push(user)

    const result = await sut.execute({ email: user.email, password: 'password-not-existing' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
    expect(result.value).toMatchObject({
      message: 'Credentials are not valid.'
    })
  })

  it('should be able to authenticate user', async () => {
    const user = makeUser({}, new UniqueEntityId('testing'))
    usersRepository.users.push(user)

    const result = await sut.execute({ email: user.email, password: user.password })

    const expectedPayload = '{"sub":"testing","role":"user"}'

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      token: expectedPayload,
    })
  })
})
