import type { Priority, Status, Task } from "../entities/task.js"
import type { TasksRepository } from "../repositories/tasks-repository.js"
import { TitleAlreadyExistsError } from "./errors/title-already-exists.js"

interface CreateTaskUseCaseRequest {
    title: string
    description: string
    priority: Priority
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
        const existingTask = await this.tasksRepository.findByTitle(title)
        if (existingTask) throw new TitleAlreadyExistsError()
        
        const task = await this.tasksRepository.create({
            title,
            description,
            priority,
            status: 'pending',
        })

        return { task }
    }
}