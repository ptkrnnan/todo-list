import { Priority, Status, Task } from "../entities/task"
import { TasksRepository } from "../repositories/tasks-repository"

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
            status: "pending"
        })

        return { task }
    }
}