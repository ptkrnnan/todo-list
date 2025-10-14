import type { UUID } from "node:crypto";
import type { Task } from "../entities/task.js";

export interface TasksRepository {
    create(data: any): Promise<Task>
    update(id: UUID, data: any): Promise<Task>
    delete(id: UUID): Promise<void>
    findByTitle(title: string): Promise<Task | null>
    findById(id: UUID): Promise<Task | null>
    findAll(): Promise<Task[]>
}