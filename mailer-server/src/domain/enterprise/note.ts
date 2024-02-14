import { Entity } from "@/core/entities/entity.ts"
import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts"

interface NoteProps {
  authorId: UniqueEntityId
  content: string
  createdAt?: Date
  updatedAt?: Date
}

export class Note extends Entity<NoteProps> {
  get authorId() {
    return this.props.authorId
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: NoteProps, id?: UniqueEntityId) {
    return new Note({
      authorId: props.authorId,
      content: props.content,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    }, id)
  }
}