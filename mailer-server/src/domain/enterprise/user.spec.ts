import { describe, expect, it } from "vitest";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.ts";
import { makeUser } from "test/factories/make-user.ts";

describe('User Entity', () => {
  it ('should be able to receive id', () => {
    const user = makeUser({}, new UniqueEntityId('user-test'))

    expect(user).toMatchObject({
      id: {
        value: 'user-test'
      },
    })
  })

  it ('should be able to get all user props', () => {
    const user = makeUser({}, new UniqueEntityId('user-test'))

    expect(user).toMatchObject({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    })
  })
})

