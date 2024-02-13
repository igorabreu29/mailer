import { z } from "zod"
import { FastifyInstance } from "fastify"
import { BadRequestException } from "../../errors/bad-request-exception.ts"
import { makeRestorePasswordUseCase } from "../../factories/make-restore-password-use-case.ts"

export async function forgotPassword(app: FastifyInstance) {
  app.patch('/restore-password', async (req, res) => {
    const restorePasswordQuery = z.object({
      email: z.string().email()
    })
  
    const restorePasswordBody = z.object({
      password: z.string().min(8, 'The password cannot be less than 6 characthers.').max(18, 'The password cannot be bigger than 18 characters.')
    })
  
    const { email } = restorePasswordQuery.parse(req.query)
    const { password } = restorePasswordBody.parse(req.body)

    const useCase = makeRestorePasswordUseCase()
    const result = await useCase.execute({ email, password })

    if (result.isLeft()) {
      const error = result.value

      throw new BadRequestException(error.message)
    }

    return res.status(204).send()
  }) 
}