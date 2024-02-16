import { AuthenticateUseCase } from "../../domain/app/use-cases/authenticate-use-case.ts";
import { BcryptHasher } from "../cryptography/bcrypt-hasher.ts";
import { Encrypter } from "../cryptography/jwt-encrypter.ts";
import { PrismaUsersRepository } from "../prisma/repositories/prisma-users-repository.ts";

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const jwtEncrypter = new Encrypter()
  const hasher = new BcryptHasher()
  return new AuthenticateUseCase(usersRepository, jwtEncrypter, hasher)
}