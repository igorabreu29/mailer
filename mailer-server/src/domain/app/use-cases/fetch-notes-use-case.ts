import { Either, left, right } from "@/core/either.ts"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.ts"
import { Note } from "@/domain/enterprise/note.ts"
import { NotesRepository } from "../repositories/notes-repository.ts"

interface FetchNotesUseCaseRequest {
  authorId: string
  page: number
}

type FetchNotesUseCaseResponse = Either<null, {
  notes: Note[]
}>

export class FetchNotesUseCase {
  constructor(
    private notesRepository: NotesRepository
  ) {}

  async execute({ authorId, page }: FetchNotesUseCaseRequest): Promise<FetchNotesUseCaseResponse> {
    const notes = await this.notesRepository.findManyByAuthorId(authorId, page)

    return right({
      notes
    })
  }
}