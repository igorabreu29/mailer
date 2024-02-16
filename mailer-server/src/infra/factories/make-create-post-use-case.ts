import { PrismaNotesRepository } from "../prisma/repositories/prisma-notes-repository.ts";
import { CreateNoteUseCase } from "@/domain/app/use-cases/create-note-use-case.ts";

export function makeCreateNoteRepositoryUseCase() {
  const notesRepository = new PrismaNotesRepository()
  return new CreateNoteUseCase(notesRepository)
}