import { InMemoryTasksRepository } from "../../model/repositories/in-memory/in-memory-tasks-repository.js";
import { CreateTaskUseCase } from "../../model/use-cases/create-task.js";

export function makeCreateUseCase() {
    const taskRepository = new InMemoryTasksRepository()
    return new CreateTaskUseCase(taskRepository)
}