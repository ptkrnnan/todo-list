import type { Task } from "../entities/task.js";

export interface TasksRepository {
    create(data: any): Promise<Task>
    update(id: string, data: any): Promise<Task>
    delete(id: string): Promise<void>
    findByTitle(title: string): Promise<Task | null>
    findById(id: string): Promise<Task | null>
    findAll(): Promise<Task[]>
}