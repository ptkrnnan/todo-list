import { Task } from "../../entities/task.js";

type PrismaTask = {
    id: string;
    title: string;
    description: string | "";
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
        const description = data.description === "" ? undefined : data.description;
        const task = new Task(
            data.title,
            data.priority,
            data.status,
            description,
        );

        (task as any).id = data.id;

        return task;
    }
}