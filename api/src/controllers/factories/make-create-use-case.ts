import { PrismaTasksRepository } from "../../model/repositories/prisma/prisma-tasks-repository.js";
import { CreateTaskUseCase } from "../../model/use-cases/create-task.js";

export function makeCreateUseCase() {
    const taskRepository = new PrismaTasksRepository()
    return new CreateTaskUseCase(taskRepository)
}