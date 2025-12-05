import { Task } from "../../entities/task.js";
import type { TasksRepository } from "../tasks-repository.js";
import { TaskNotFoundError } from "../../use-cases/errors/task-not-found.js";

export class InMemoryTasksRepository implements TasksRepository {
    public items: Task[] = []

    async create(data: any): Promise<Task> {
        const task = new Task({
            title: data.title,
            description: data.description ?? undefined,
            priority: data.priority,
            status: data.status,
        })
        this.items.push(task)
        return task
    }

    async update(id: string, data: any): Promise<Task> {
        const task = await this.findById(id)
        if (!task) throw new TaskNotFoundError()
        
        if (data.title) task.changeTitle(data.title)
        if (data.description) task.changeDescription(data.description)
        if (data.priority) task.changePriority(data.priority)
        if (data.status) task.changeStatus(data.status)
        
        return task
    }

    async delete(id: string): Promise<void> {
        const taskIndex = this.items.findIndex(item => item.id === id)
        this.items.splice(taskIndex, 1)
    }

    async findByTitle(title: string): Promise<Task | null> {
        const task = this.items.find(item => item.title === title)
        return task ?? null
    }

    async findById(id: string): Promise<Task | null> {
        const task = this.items.find(item => item.id === id)
        return task ?? null
    }

    async findAll(): Promise<Task[]> {
        return this.items
    }
}