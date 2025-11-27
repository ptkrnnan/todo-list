import type { UUID } from "crypto";
import type { Task } from "../../entities/task.js";
import type { TasksRepository } from "../tasks-repository.js";
import { PrismaClient } from "@prisma/client";
import { TaskMapper } from "../mappers/task-mapper.js";

const prisma = new PrismaClient();

export class PrismaTasksRepository implements TasksRepository {
    async create(data: Task): Promise<Task> {
        const task = TaskMapper.toPrisma(data)
        const createdTask = await prisma.task.create({
            data: task
        })
        return TaskMapper.toDomain(createdTask)
    }

    async update(id: UUID, data: Task): Promise<Task> {
        const task = TaskMapper.toPrisma(data)
        const updatedTask = await prisma.task.update({ where: { id }, data: task })
        return TaskMapper.toDomain(updatedTask)
    }

    async delete(id: UUID): Promise<void> {
        await prisma.task.delete({ where: { id } })
    }

    async findByTitle(title: string): Promise<Task | null> {
        const task = await prisma.task.findFirst({ where: { title } })
        if (!task) return null
        return TaskMapper.toDomain(task)
    }

    async findById(id: UUID): Promise<Task | null> {
        const task = await prisma.task.findUnique({ where: { id } })
        if (!task) return null
        return TaskMapper.toDomain(task)
    }

    async findAll(): Promise<Task[]> {
        const tasks = await prisma.task.findMany()
        return tasks.map(TaskMapper.toDomain)
    }
}