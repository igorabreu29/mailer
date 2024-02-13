import { makeUser } from "test/factories/make-user.ts"
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository.ts"
import { describe, it, beforeEach, afterEach, vi, expect } from "vitest"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.ts"
import { ForgotPasswordUseCase } from "./forgot-password-use-case.ts"


let usersRepository: InMemoryUsersRepository
let sut: ForgotPasswordUseCase

describe('Forgot password use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new ForgotPasswordUseCase(usersRepository)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it ('should not be able to send mail for restore password', async () => {
    const result = await sut.execute({ email: 'not-exiting' })

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it ('should be able to send mail for restore password', async () => {
    const user = makeUser()
    usersRepository.users.push(user)

    const spyOn = vi.spyOn(sut, 'sendMail')

    spyOn.mockImplementationOnce(async () => {})
    const result = await sut.execute({ email: user.email})

    expect(spyOn).toHaveBeenCalledOnce()
    expect(result.isRight()).toBe(true)
    expect(result.value).toBeNull()
  })
})