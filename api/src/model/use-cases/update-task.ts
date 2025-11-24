import type { UUID } from "node:crypto"
import type { Priority, Status, Task } from "../entities/task.js"
import type { TasksRepository } from "../repositories/tasks-repository.js"
import { CannotUpdateCompletedTaskError } from "./errors/cannot-update-completed-task.js"
import { TitleAlreadyExistsError } from "./errors/title-already-exists.js"
import { TaskNotFoundError } from "./errors/task-not-found.js"

interface UpdateTaskCaseUseRequest {
    id: UUID
    title: string
    description: string
    priority: Priority
    status: Status
}

interface UpdateTaskCaseUseResponse {
    task: Task
}

export class UpdateTaskCaseUse {
    constructor(private taskRepository: TasksRepository) {}

    async execute({
        id,
        title,
        description,
        priority,
        status,
    }: UpdateTaskCaseUseRequest): Promise<UpdateTaskCaseUseResponse> {
        
        const existingTask = await this.taskRepository.findById(id)
        if (!existingTask) throw new TaskNotFoundError()

        const taskWithSameTitle = await this.taskRepository.findByTitle(title)
        if (taskWithSameTitle && taskWithSameTitle.id !== id) throw new TitleAlreadyExistsError()

        if (existingTask.status === 'completed') throw new CannotUpdateCompletedTaskError()

        existingTask.changeTitle(title)
        existingTask.changeDescription(description)
        existingTask.changePriority(priority)
        existingTask.changeStatus(status)

        const task = await this.taskRepository.update(id, existingTask)

        return { task }
    }
}