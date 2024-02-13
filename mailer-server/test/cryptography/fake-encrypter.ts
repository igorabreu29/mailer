import { JWTEncrypter } from "../../src/domain/app/cryptography/jwt-encrypter.ts";

export class FakeEncrypter implements JWTEncrypter {
  encrypt(payload: Record<string, unknown>) {
    return JSON.stringify(payload)
  }
}