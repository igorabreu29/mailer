import { Either, left, right } from "@/core/either.ts"
import { User } from "@/domain/enterprise/user.ts"
import { UserAlreadyExistError } from "../errors/user-already-exist-error.ts"
import { UsersRepository } from "../repositories/users-repository.ts"
import { Hasher } from "../cryptography/hasher.ts"

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterUseCaseResponse = Either<UserAlreadyExistError, null>

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hasher: Hasher
  ) {}

  async execute({ email, name, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userAlreadyExist = await this.usersRepository.findByEmail(email)

    if (userAlreadyExist) {
      return left(new UserAlreadyExistError())
    }

    const passwordHash = await this.hasher.hash(password)
    const user = User.create({ email, name, password: passwordHash })

    await this.usersRepository.create(user)

    return right(null)
  } 
}