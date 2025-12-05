import type { TasksRepository } from "../repositories/tasks-repository.js"
import { TaskNotFoundError } from "./errors/task-not-found.js"

interface DeleteTaskUseCaseRequest {
    id: string
}

export class DeleteTaskUseCase {
    constructor(private tasksRepository: TasksRepository) {}

    async execute({
        id,
    }: DeleteTaskUseCaseRequest): Promise<void> {
        const task = await this.tasksRepository.findById(id)
        if (!task) throw new TaskNotFoundError()
        
        await this.tasksRepository.delete(task.id)
    }
}