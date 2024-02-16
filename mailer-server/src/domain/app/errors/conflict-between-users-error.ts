export class ConflictBetweenUsersError extends Error {
  constructor() {
    super("Conflict! User don't have permission to access.")
  }
}