import { Either, left, right } from "@/core/either.ts"
import { transporter } from "@/infra/lib/transporter.ts"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.ts"
import { UsersRepository } from "../repositories/users-repository.ts"


interface ForgotPasswordUseCaseRequest {
  email: string
}

type ForgotPasswordUseCaseResponse = Either<ResourceNotFoundError, null>

export class ForgotPasswordUseCase {
  constructor(
    private usersRepository: UsersRepository
  ) {}

  async execute({ email }: ForgotPasswordUseCaseRequest): Promise<ForgotPasswordUseCaseResponse> {
    const userExist = await this.usersRepository.findByEmail(email)

    if (!userExist) {
      return left(new ResourceNotFoundError())
    }

    await this.sendMail(email)

    return right(null)
  } 

  async sendMail(email: string) {
    await transporter.sendMail({
      from: 'System Login <system@logintest.com>',
      to: `<${email}>`,
      subject: 'Forget Password',
      html: `
        Hey, change your password clicking on button.
        
        <button>
          <a target=_blank href=http://localhost:5173/restore?email=${email}>Restore your password.</a>
        </button>
      `
    })
  }
}