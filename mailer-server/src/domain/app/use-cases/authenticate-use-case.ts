import { Either, left, right } from "@/core/either.ts"
import { JWTEncrypter } from "../cryptography/jwt-encrypter.ts"
import { UsersRepository } from "../repositories/users-repository.ts"
import { WrongCredentialsError } from "../errors/wrong-credentials-error.ts"
import { Hasher } from "../cryptography/hasher.ts"

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = Either<WrongCredentialsError, {
  token: string
}>

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private jwtEncrypter: JWTEncrypter,
    private hasher: Hasher
  ) {}

  async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const userExist = await this.usersRepository.findByEmail(email)

    if (!userExist) {
      return left(new WrongCredentialsError())
    }

    const isValidPassword = await this.hasher.compare(password, userExist.password)

    if (!isValidPassword) {
      return left(new WrongCredentialsError())
    } 

    const token = this.jwtEncrypter.encrypt({
      sub: userExist.id.toValue(),
      role: userExist.role
    })

    return right({
      token,
    })
  } 
}