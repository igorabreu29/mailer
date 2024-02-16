import { Hasher } from "@/domain/app/cryptography/hasher.ts";

import { randomUUID } from "node:crypto";

export class FakeHasher implements Hasher {
  async hash(password: string) {
    return `${password}-${randomUUID()}`
  }

  async compare(password: string, passwordHash: string) {
    if (password === passwordHash) {
      return true
    }
    return false
  }
}