import { NotesRepository } from "@/domain/app/repositories/notes-repository.ts"
import { Note } from "@/domain/enterprise/note.ts"
import { prisma } from "@/infra/lib/prisma.ts"
import { PrismaNoteMapper } from "../mappers/prisma-note-mapper.ts"

export class PrismaNotesRepository implements NotesRepository {
  async findById(id: string) {
    const note = await prisma.note.findUnique({ 
      where: {
        id,
      }
     })

     if (!note) return null
    return PrismaNoteMapper.toDomain(note)
  }

  async findManyByAuthorId(authorId: string, page: number) {
    const notes = await prisma.note.findMany({ 
      where: {
        authorId
      }
    })

    return notes.map(note => PrismaNoteMapper.toDomain(note))
  }

  async create(note: Note) {
    const data = PrismaNoteMapper.toPrisma(note)

    const createdNote = await prisma.note.create({ data })

    return PrismaNoteMapper.toDomain(createdNote)
  }

  async delete(id: string) {
    await prisma.note.delete({
      where: {
        id,
      }
    })
  }
} 