import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts"
import { Note } from "@/domain/enterprise/note.ts"
import { Prisma, Note as PrismaNote } from '@prisma/client'

export class PrismaNoteMapper {
  static toDomain(note: PrismaNote): Note {
    return Note.create({
      authorId: new UniqueEntityId(note.authorId),
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt
    }, new UniqueEntityId(note.id))
  }

  static toPrisma(note: Note): Prisma.NoteUncheckedCreateInput {
    return {
      id: note.id.toValue(),
      authorId: note.authorId.toValue(),
      content: note.content,
    }
  }
}