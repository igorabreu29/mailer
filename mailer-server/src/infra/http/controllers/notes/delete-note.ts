import { ConflictBetweenUsersError } from "@/domain/app/errors/conflict-between-users-error.ts";
import { makeDeleteNoteUseCase } from "@/infra/factories/make-delete-note-use-case.ts";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteNote(req: FastifyRequest, res: FastifyReply) {
  const deleteNoteBodyParams = z.object({
    id: z.string().cuid()
  })

  const { id } = deleteNoteBodyParams.parse(req.params)
  const authorId = req.user.sub

  const useCase = makeDeleteNoteUseCase()
  const result = await useCase.execute({ authorId, id })

  if (result.isLeft()) {
    const error = result.value

    switch(error.constructor) {
      case ConflictBetweenUsersError: 
        return res.status(400).send({ type: 'UnauthorizedException', message: error.message })
      default: 
        return res.status(400).send({ type: 'BadRequestException', message: error.message })
    }
  }

  return res.status(204).send()
}