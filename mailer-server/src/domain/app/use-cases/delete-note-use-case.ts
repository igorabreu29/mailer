import { Either, left, right } from "@/core/either.ts"
import { NotesRepository } from "../repositories/notes-repository.ts"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.ts"
import { ConflictBetweenUsersError } from "../errors/conflict-between-users-error.ts"

interface DeleteNoteUseCaseRequest {
  id: string
  authorId: string
}

type DeleteNoteUseCaseResponse = Either<ResourceNotFoundError | ConflictBetweenUsersError, null>

export class DeleteNoteUseCase {
  constructor(
    private notesRepository: NotesRepository
  ) {}

  async execute({ authorId, id }: DeleteNoteUseCaseRequest): Promise<DeleteNoteUseCaseResponse> {
    const note = await this.notesRepository.findById(id)

    if (!note) {
      return left(new ResourceNotFoundError())
    }

    if (note.authorId.toValue() !== authorId) {
      return left(new ConflictBetweenUsersError())
    }

    await this.notesRepository.delete(id)

    return right(null)
  } 
}