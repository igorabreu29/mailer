import { describe, it, expect, beforeEach } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.ts'
import { RestorePasswordUseCase } from './restore-password-use-case.ts'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository.ts'
import { User } from '@/domain/enterprise/user.ts'
import { makeUser } from 'test/factories/make-user.ts'

let usersRepository: InMemoryUsersRepository
let sut: RestorePasswordUseCase

describe('Restore Password use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RestorePasswordUseCase(usersRepository)
  })

  it ('should not be able to restore password', async () => {
    const result = await sut.execute({ email: 'not-exiting', password: 'node_node' })

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it ('should be able to send mail for restore password', async () => {
    const user = makeUser()
    usersRepository.users.push(user)

    expect(usersRepository.users[0].password).toEqual('johnjohn')

    const result = await sut.execute({ email: user.email, password: 'node_node' })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeNull()
    expect(usersRepository.users[0].password).toEqual('node_node')
  })
})