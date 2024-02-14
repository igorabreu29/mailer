import { Either, right } from "@/core/either.ts"
import { Note } from "@/domain/enterprise/note.ts"
import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts"
import { NotesRepository } from "../repositories/notes-repository.ts"

interface CreateNoteUseCaseRequest {
  authorId: string
  content: string
}

type CreateNoteUseCaseResponse = Either<null, {
  note: Note
}>

export class CreateNoteUseCase {
  constructor(
    private notesRepository: NotesRepository
  ) {}

  async execute({ authorId, content }: CreateNoteUseCaseRequest): Promise<CreateNoteUseCaseResponse> {
    let note = Note.create({
      authorId: new UniqueEntityId(authorId),
      content
    })

    note = await this.notesRepository.create(note)

    return right({
      note
    })
  } 
}