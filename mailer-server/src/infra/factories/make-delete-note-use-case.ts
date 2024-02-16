import { DeleteNoteUseCase } from "@/domain/app/use-cases/delete-note-use-case.ts";
import { PrismaNotesRepository } from "../prisma/repositories/prisma-notes-repository.ts";

export function makeDeleteNoteUseCase() {
  const notesRepository = new PrismaNotesRepository()
  return new DeleteNoteUseCase(notesRepository)
}