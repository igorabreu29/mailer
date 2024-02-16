import { app } from "../../app.ts";
import { JWTEncrypter } from "../../domain/app/cryptography/jwt-encrypter.ts";

export class Encrypter implements JWTEncrypter {
  encrypt(payload: Record<string, unknown>) {
    const token = app.jwt.sign({
      role: payload.role
    }, {
      sub: payload.sub as string,
      expiresIn: '10m'
    })

    return token
  }
}