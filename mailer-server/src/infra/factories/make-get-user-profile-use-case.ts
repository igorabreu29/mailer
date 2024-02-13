import { GetUserProfileUseCase } from "@/domain/app/use-cases/get-user-profile.ts";
import { PrismaUsersRepository } from "../prisma/repositories/prisma-users-repository.ts";

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new GetUserProfileUseCase(usersRepository)
}