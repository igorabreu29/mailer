import { Either, left, right } from "@/core/either.ts"
import { JWTEncrypter } from "../cryptography/jwt-encrypter.ts"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.ts"
import { UsersRepository } from "../repositories/users-repository.ts"

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = Either<ResourceNotFoundError, {
  token: string
}>

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private jwtEncrypter: JWTEncrypter
  ) {}

  async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const userExist = await this.usersRepository.findByEmail(email)

    if (!userExist) {
      return left(new ResourceNotFoundError())
    }

    const isValidPassword = userExist.password === password

    if (!isValidPassword) {
      return left(new ResourceNotFoundError())
    } 

    const token = this.jwtEncrypter.encrypt({
      sub: userExist.id.toValue(),
      name: userExist.name,
      email: userExist.email,
    })

    return right({
      token,
    })
  } 
}