import type { UUID } from "crypto";
import { Task, type Priority, type Status } from "../../entities/task.js";
import type { TasksRepository } from "../tasks-repository.js";

export class InMemoryTasksRepository implements TasksRepository {
    public items: Task[] = []

    async create(data: any): Promise<Task> {
        const task = new Task(data.title, data.description, data.priority, data.status)
        this.items.push(task)
        return task
    }

    async update(id: UUID, data: any): Promise<Task> {
        const task = await this.findById(id)
        if (!task) throw new Error('Task not found')
        
        if (data.title) task.changeTitle(data.title)
        if (data.description) task.changeDescription(data.description)
        if (data.priority) task.changePriority(data.priority)
        if (data.status) task.changeStatus(data.status)
        
        return task
    }

    async delete(id: UUID): Promise<void> {
        const taskIndex = this.items.findIndex(item => item.id === id)
        this.items.splice(taskIndex, 1)
    }

    async findByTitle(title: string): Promise<Task | null> {
        const task = this.items.find(item => item.title === title)
        return task ?? null
    }

    async findById(id: UUID): Promise<Task | null> {
        const task = this.items.find(item => item.id === id)
        return task ?? null
    }

    async findAll(): Promise<Task[]> {
        return this.items
    }
}