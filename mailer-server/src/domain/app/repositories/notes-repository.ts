import { Note } from "@/domain/enterprise/note.ts";

export interface NotesRepository {
  findById: (id: string) => Promise<Note | null>
  findManyByAuthorId: (authorId: string, page: number) => Promise<Note[]>
  create: (note: Note) => Promise<Note>
  delete: (id: string) => Promise<void>
}