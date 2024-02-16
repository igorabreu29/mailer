import { NotesRepository } from "@/domain/app/repositories/notes-repository.ts";
import { Note } from "@/domain/enterprise/note.ts";

export class InMemoryNotesRepository implements NotesRepository {
  public notes: Note[] = []

  async findById(id: string) {
    const note = this.notes.find(note => note.id.toValue() === id)

    if (!note) return null
    return note
  }

  async findManyByAuthorId(authorId: string, page: number) {
    const notes = this.notes
      .filter(note => note.authorId.toValue() === authorId)
      .sort((a, b) => {
        return Number(b.createdAt?.getTime()) - Number(a.createdAt?.getTime())
      })
      .slice((page - 1) * 20, page * 20)
    
    return notes
  }

  async create(note: Note) {
    this.notes.push(note)
    return note
  }

  async delete(id: string) {
    const noteIndex = this.notes.findIndex(note => note.id.toValue() === id)
    this.notes.splice(noteIndex, 1)
  }
}