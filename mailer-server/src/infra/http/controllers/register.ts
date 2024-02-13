import { FastifyInstance } from "fastify";
import z from "zod";
import { makeRegisterUseCase } from "../../factories/make-register-use-case.ts";
import { BadRequestException } from "../../errors/bad-request-exception.ts";

export async function register(app: FastifyInstance) {
  app.post('/register', async (req, res) => {
    const registerBody = z.object({
      name: z.string().min(1, 'The name cannot be empty!'),
      email: z.string().email(),
      password: z.string().min(8, 'The password cannot be less than 6 characthers.').max(18, 'The password cannot be bigger than 18 characters.')
    })
  
    const { email, name, password } = registerBody.parse(req.body)

    const useCase = makeRegisterUseCase()
    const result = await useCase.execute({ email, name, password })

    if (result.isLeft()) {
      const error = result.value

      throw new BadRequestException(error.message)
    }

    return res.status(201).send()
  })
}