import { PrismaTasksRepository } from "../../model/repositories/prisma/prisma-tasks-repository.js";
import { DeleteTaskUseCase } from "../../model/use-cases/delete-task.js";

export function makeDeleteUseCase() {
    const taskRepository = new PrismaTasksRepository()
    return new DeleteTaskUseCase(taskRepository)
}