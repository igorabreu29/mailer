import { Note } from "@/domain/enterprise/note.ts";

export interface NotesRepository {
  findManyByAuthorId: (authorId: string, page: number) => Promise<Note[]>
  findById: (id: string) => Promise<Note | null>
  create: (note: Note) => Promise<Note>
}