import type { Task } from "../entities/task.js";

export interface TasksRepository {
    create(data: any): Promise<Task>
}