import { RestorePasswordUseCase } from "../../domain/app/use-cases/restore-password-use-case.ts";
import { PrismaUsersRepository } from "../prisma/repositories/prisma-users-repository.ts";

export function makeRestorePasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new RestorePasswordUseCase(usersRepository)
}