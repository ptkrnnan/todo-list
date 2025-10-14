import type { Priority, Status, Task } from "../entities/task.js"
import type { TasksRepository } from "../repositories/tasks-repository.js"

interface ListTasksUseCaseRequest {
    priority?: Priority
    status?: Status
}

interface ListTasksUseCaseResponse {
    tasks: Task[]
}

export class ListTasksUseCase {
    constructor(private tasksRepository: TasksRepository) {}

    async execute(
        filters: ListTasksUseCaseRequest = {}
    ): Promise<ListTasksUseCaseResponse> {
        const allTasks = await this.tasksRepository.findAll()

        const tasks = allTasks.filter((task) => {
           return (
            (!filters.priority || task.priority === filters.priority) &&
            (!filters.status || task.status === filters.status)
           )
        })
        
        return { tasks }
    }
}