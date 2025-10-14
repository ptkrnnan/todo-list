import type { UUID } from "node:crypto"
import type { TasksRepository } from "../repositories/tasks-repository.js"

interface DeleteTaskUseCaseRequest {
    id: UUID
}

export class DeleteTaskUseCase {
    constructor(private tasksRepository: TasksRepository) {}

    async execute({
        id,
    }: DeleteTaskUseCaseRequest): Promise<void> {
        const task = await this.tasksRepository.findById(id)
        if (!task) throw new Error('Task not found.')
        
        await this.tasksRepository.delete(task.id)
    }
}