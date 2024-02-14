export class ConflictBetweenUsersError extends Error {
  constructor() {
    super('Conflict between resource of user.')
  }
}