import { describe, it, beforeEach, expect } from "vitest";
import { InMemoryNotesRepository } from "test/repositories/in-memory-notes-repository.ts";
import { FetchNotesUseCase } from "./fetch-notes-use-case.ts";
import { makeNote } from "test/factories/make-note.ts";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";

let notesRepository: InMemoryNotesRepository
let sut: FetchNotesUseCase

describe('Fetch notes use case', () => {
  beforeEach(() => {
    notesRepository = new InMemoryNotesRepository()
    sut = new FetchNotesUseCase(notesRepository)
  })

  it ("should be able to fetch all notes", async () => {
    const note1 = makeNote({ authorId: new UniqueEntityId('test') })
    notesRepository.notes.push(note1)
    const note2 = makeNote({ authorId: new UniqueEntityId('test') })
    notesRepository.notes.push(note2)

    const result = await sut.execute({ authorId: 'test', page: 1})

    expect(result.isRight()).toBe(true)
    expect(result.value?.notes).toEqual([
      expect.objectContaining({
        authorId: {
          value: 'test'
        }
      }),
      expect.objectContaining({
        authorId: {
          value: 'test'
        }
      }),
    ])
  })

  it("should be able to fetch paginated notes", async () => {
    for (let i = 1; i <= 22; i++) {
      notesRepository.notes.push(makeNote({ authorId: new UniqueEntityId('test') }))
    }

    const result = await sut.execute({ authorId: 'test', page: 2 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.notes).toHaveLength(2)
    expect(result.value?.notes).toEqual([
      expect.objectContaining({
        id: {
          value: expect.any(String)
        }
      }),
      expect.objectContaining({
        id: {
          value: expect.any(String)
        }
      })
    ])
  })
})