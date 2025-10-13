import { Task } from "../entities/task";

export interface TasksRepository {
    create(data: any): Promise<Task>
}