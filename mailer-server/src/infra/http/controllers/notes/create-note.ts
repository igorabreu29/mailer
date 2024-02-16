import { BadRequestException } from "@/infra/errors/bad-request-exception.ts";
import { makeCreateNoteRepositoryUseCase } from "@/infra/factories/make-create-post-use-case.ts";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createNote(req: FastifyRequest, res: FastifyReply) {
  const createNoteBodySchema = z.object({
    content: z.string()
  })

  const { content } = createNoteBodySchema.parse(req.body)
  const authorId = req.user.sub

  const useCase = makeCreateNoteRepositoryUseCase()
  const result = await useCase.execute({ authorId, content })

  if (result.isLeft()) {
    return res.status(400).send({ type: 'BadRequestException', message: 'Something error' })
  }

  const { note } = result.value

  return res.status(201).send({ note })
}