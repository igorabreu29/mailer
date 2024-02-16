import { Hasher } from "@/domain/app/cryptography/hasher.ts";
import bcrypt from 'bcryptjs'

export class BcryptHasher implements Hasher {
  async hash(password: string) {
    const passwordHash = await bcrypt.hash(password, 8)
    return passwordHash
  }

  async compare(password: string, passwordHash: string) {
    const equals = await bcrypt.compare(password, passwordHash)
    return equals
  }
}