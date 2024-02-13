import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt.ts";
import { makeGetUserProfileUseCase } from "@/infra/factories/make-get-user-profile-use-case.ts";
import { BadRequestException } from "@/infra/errors/bad-request-exception.ts";
import { UserPresenter } from "../presenters/user-presenter.ts";

export async function profile(app: FastifyInstance) {
  app.get('/profile', { onRequest: [verifyJWT] }, async (req, res) => {
    const useCase = makeGetUserProfileUseCase()
    const result = await useCase.execute({ id: req.user.sub })

    if (result.isLeft()) {
      const error = result.value

      throw new BadRequestException(error.message)
    }

    const user = UserPresenter.toHTTP(result.value.user)
    
    return res.send({
      user: {
        ...user,
        password: null
      }
    })
  })
}