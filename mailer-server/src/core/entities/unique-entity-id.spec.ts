import { describe, it, expect } from 'vitest'
import { UniqueEntityId } from './unique-entity-id.ts'

describe('Unique Entity Id', () => {
  it ('should be able to generate a random id', () => {
    const result = new UniqueEntityId()

    expect(result.toValue()).toEqual(expect.any(String))
  })

  it ('should be able to generate a spefic id', () => {
    const result = new UniqueEntityId('id')

    expect(result.toValue()).toEqual('id')
  })
})