import { describe, expect, it } from "vitest";
import { makeNote } from "test/factories/make-note.ts";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";

describe('User Entity', () => {
  it ('should be able to receive id of note and authorId', () => {
  const note = makeNote({}, new UniqueEntityId('note-test'))

    expect(note).toMatchObject({
      id: {
        value: 'note-test'
      },
      authorId: note.authorId
    })
  })

  it ('should be able to get all user props', () => {
    const note = makeNote({}, new UniqueEntityId('note-test'))

    expect(note).toMatchObject({
      id: note.id,
      authorId: note.authorId,
      content: note.content,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    })
  })
})

