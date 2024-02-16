import { z } from "zod"
import { makeForgotPasswordUseCase } from "../../factories/make-forgot-password-use-case.ts"
import { FastifyInstance } from "fastify"
import { BadRequestException } from "../../errors/bad-request-exception.ts"

export async function restorePassword(app: FastifyInstance) {
  app.post('/forgot-password', async (req, res) => {
    const forgetPasswordBody = z.object({
      email: z.string().email()
    })
  
    const { email } = forgetPasswordBody.parse(req.body)
    
    const useCase = makeForgotPasswordUseCase()
    const result = await useCase.execute({ email })

    if (result.isLeft()) {
      const error = result.value
      return res.status(400).send({ type: 'BadRequestException', message: error.message })
    }
  
    return res.send()
  })
}