import type { Priority, Status, Task } from "../entities/task.js"
import type { TasksRepository } from "../repositories/tasks-repository.js"

interface CreateTaskUseCaseRequest {
    title: string
    description: string
    priority: Priority
    status: Status
}

interface CreateTaskUseCaseResponse {
    task: Task
}

export class CreateTaskUseCase {
    constructor(private tasksRepository: TasksRepository) {}

    async execute({
        title,
        description,
        priority,
    }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {

        const task = await this.tasksRepository.create({
            title,
            description,
            priority,
        })

        return { task }
    }
}