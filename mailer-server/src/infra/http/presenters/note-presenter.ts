import { Note } from "@/domain/enterprise/note.ts";
import { Prisma } from "@prisma/client";

export class NotePresenter {
  static toHTTP(note: Note): Prisma.NoteUncheckedCreateInput {
    return {
      id: note.id.toValue(),
      authorId: note.authorId.toValue(),
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt
    }
  }
}