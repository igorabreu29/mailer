import { InMemoryNotesRepository } from 'test/repositories/in-memory-notes-repository.ts'
import { describe, it, expect, beforeEach } from 'vitest'
import { DeleteNoteUseCase } from './delete-note-use-case.ts'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.ts'
import { makeNote } from 'test/factories/make-note.ts'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.ts'
import { ConflictBetweenUsersError } from '../errors/conflict-between-users-error.ts'

let notesRepository: InMemoryNotesRepository
let sut: DeleteNoteUseCase

describe('Delete note use case', () => {
  beforeEach(() => {
    notesRepository = new InMemoryNotesRepository()
    sut = new DeleteNoteUseCase(notesRepository)
  })

  it('should not be able to delete note', async () => {
    const result = await sut.execute({ authorId: 'test', id: "not-existing" })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to delete note with different author id', async () => {
    const note = makeNote({ authorId: new UniqueEntityId('test') }, new UniqueEntityId('note-id'))
    notesRepository.notes.push(note)

    expect(notesRepository.notes).toHaveLength(1)

    const result = await sut.execute({ authorId: 'other-author', id: "note-id" })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ConflictBetweenUsersError)
  })

  it('should be able to delete note', async () => {
    const note = makeNote({ authorId: new UniqueEntityId('test') }, new UniqueEntityId('note-id'))
    notesRepository.notes.push(note)

    expect(notesRepository.notes).toHaveLength(1)

    const result = await sut.execute({ authorId: 'test', id: "note-id" })

    expect(result.isRight()).toBe(true)
    expect(notesRepository.notes).toHaveLength(0)
  })
})