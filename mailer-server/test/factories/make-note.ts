import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";
import { Note } from "@/domain/enterprise/note.ts";
import { faker } from '@faker-js/faker'

export function makeNote(
  override: Partial<Note> = {},
  id?: UniqueEntityId
) {
  return Note.create({
    authorId: new UniqueEntityId(),
    content: faker.lorem.text(),
    ...override
  }, id)
}