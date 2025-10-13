import { Task } from "../../entities/task.js";
import type { TasksRepository } from "../tasks-repository.js";

export class InMemoryTasksRepository implements TasksRepository {
    public items: Task[] = []

    async create(data: any): Promise<Task> {
        const task = new Task(data.title, data.description, data.priority, data.status)
        this.items.push(task)
        return task
    }
}