import { Task } from "../../entities/task.js";

type PrismaTask = {
    id: string;
    title: string;
    description: string | undefined;
    priority: "low" | "medium" | "high";
    status: "pending" | "progress" | "completed";
}

export class TaskMapper {
    static toPrisma(task: Task): PrismaTask {
        return {
            id: task.id,
            title: task.title,
            description: task.description ?? "",
            priority: task.priority,
            status: task.status
        }
    }

    static toDomain(data: PrismaTask): Task {
        const task = new Task({
            title: data.title,
            description: data.description ?? "" ? undefined : data.description,
            priority: data.priority,
            status: data.status
        });

        (task as any).id = data.id;

        return task;
    }
}