export class CannotUpdateCompletedTaskError extends Error {
    constructor() {
        super("Completed tasks cannot be updated.")
    }
}