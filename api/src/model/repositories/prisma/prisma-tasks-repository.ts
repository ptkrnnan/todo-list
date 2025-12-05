import type { Task } from "../../entities/task.js";
import type { TasksRepository } from "../tasks-repository.js";
import { TaskMapper } from "../mappers/task-mapper.js";
import { prisma } from "../../../lib/prisma.js";
import type { UUID } from "node:crypto";

export class PrismaTasksRepository implements TasksRepository {
    async create(data: Task): Promise<Task> {
        const task = TaskMapper.toPrisma(data)
        const createdTask = await prisma.task.create({
            data: {
                title: task.title,
                description: task.description ?? "",
                priority: task.priority,
                status: task.status
            }
        })
        return TaskMapper.toDomain(createdTask)
    }

    async update(id: string, data: Task): Promise<Task> {
        // const task = TaskMapper.toPrisma(data)
        // const updatedTask = await prisma.task.update({ where: { id }, data: task })
        // return TaskMapper.toDomain(updatedTask)
        throw new Error("Method not implemented.");
    }

    async delete(id: string): Promise<void> {
        await prisma.task.delete({ where: { id } })
    }

    async findByTitle(title: string): Promise<Task | null> {
        const task = await prisma.task.findFirst({ where: { title } })
        if (!task) return null
        return TaskMapper.toDomain(task)
    }

    async findById(id: string): Promise<Task | null> {
        const task = await prisma.task.findUnique({ where: { id } })
        if (!task) return null
        return TaskMapper.toDomain(task)
    }

    async findAll(): Promise<Task[]> {
        // const tasks = await prisma.task.findMany()
        // return tasks.map(TaskMapper.toDomain)
        throw new Error("Method not implemented.");
    }
}