import { FetchNotesUseCase } from "@/domain/app/use-cases/fetch-notes-use-case.ts";
import { PrismaNotesRepository } from "../prisma/repositories/prisma-notes-repository.ts";

export function makeFetchNotesRepositoryUseCase() {
  const notesRepository = new PrismaNotesRepository()
  return new FetchNotesUseCase(notesRepository)
}