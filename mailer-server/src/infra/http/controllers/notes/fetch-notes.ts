import { BadRequestException } from "@/infra/errors/bad-request-exception.ts";
import { makeFetchNotesRepositoryUseCase } from "@/infra/factories/make-fetch-notes-repository-use-case.ts";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { NotePresenter } from "../../presenters/note-presenter.ts";

export async function fetchNotes(req: FastifyRequest, res: FastifyReply) {
  const fetchNotesParamsSchema = z.object({
    page: z.coerce.number()
  })

  const { page } = fetchNotesParamsSchema.parse(req.query)
  const authorId = req.user.sub
  
  const useCase = makeFetchNotesRepositoryUseCase()
  const result = await useCase.execute({ authorId, page, })

  if (result.isLeft()) {
    return res.status(400).send({ type: 'BadRequestException', message: 'Something error!' })
  }

  const { notes } = result.value

  const notesPresenter = notes.map(NotePresenter.toHTTP)

  return res.send({ notes: notesPresenter })
}