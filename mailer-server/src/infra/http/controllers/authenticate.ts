import { FastifyInstance } from "fastify"
import { z } from "zod"
import { makeAuthenticateUseCase } from "../../factories/make-authenticate-use-case.ts"
import { WrongCredentialsError } from "@/domain/app/errors/wrong-credentials-error.ts"

export async function authenticate(app: FastifyInstance) {
  app.post('/auth', async (req, res) => {
    const authenticateBody = z.object({
      email: z.string().email(),
      password: z.string().min(8, 'The password cannot be less than 6 characthers.').max(18, 'The password cannot be bigger than 18 characters.')
    })
  
    const { email, password } = authenticateBody.parse(req.body)

    const useCase = makeAuthenticateUseCase()
    const result = await useCase.execute({ email, password })

    if (result.isLeft()) {
      const error = result.value

      switch(error.constructor) {
        case WrongCredentialsError: 
          return res.status(400).send({ type: 'UnauthorizedException', message: error.message })
        default: 
          return res.status(400).send({ type: 'BadRequestException', message: error.message })
      }
    }

    const { token } = result.value

    return res.status(201).send({ token })
  })
}