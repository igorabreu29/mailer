import { describe, it, beforeEach, expect } from "vitest";
import { CreateNoteUseCase } from "./create-note-use-case.ts";
import { InMemoryNotesRepository } from "test/repositories/in-memory-notes-repository.ts";

let notesRepository: InMemoryNotesRepository
let sut: CreateNoteUseCase

describe('Create note use case', () => {
  beforeEach(() => {
    notesRepository = new InMemoryNotesRepository()
    sut = new CreateNoteUseCase(notesRepository)
  })

  it ("should be able to create an note", async () => {
    const result = await sut.execute({ authorId: 'test', content: 'new note' })

    expect(result.isRight()).toBe(true)
    expect(result.value?.note).toMatchObject({
      id: result.value?.note.id,
      authorId: {
        value: 'test'
      },
      content: 'new note'
    })
  })
})