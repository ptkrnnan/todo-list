import { beforeEach, describe, it, expect } from "vitest";
import { InMemoryTasksRepository } from "../../repositories/in-memory/in-memory-tasks-repository.js";
import { CreateTaskUseCase } from "../create-task.js";
import { ListTasksUseCase } from "../list-tasks.js";

let taskRepository: InMemoryTasksRepository;
let createTask: CreateTaskUseCase;
let sut: ListTasksUseCase;

describe('List Tasks Use Case', () => {

    beforeEach(() => {
        taskRepository = new InMemoryTasksRepository();
        createTask = new CreateTaskUseCase(taskRepository);
        sut = new ListTasksUseCase(taskRepository);
    })

    it('should list all tasks successfully', async () => {
        await createTask.execute({
            title: 'Task 1',
            description: 'Description 1',
            priority: 'low',
        })

        await createTask.execute({
            title: 'Task 2',
            description: 'Description 2',
            priority: 'medium',
        })

        const { tasks } = await sut.execute()
        expect(tasks).toHaveLength(2)
        expect(tasks[0]?.title).toBe('Task 1')
        expect(tasks[1]?.title).toBe('Task 2')
    })

    it('should list all tasks filtered by priority and status', async () => {
        await createTask.execute({
            title: 'Task 1',
            description: 'Description 1',
            priority: 'low',
        })

        await createTask.execute({
            title: 'Task 2',
            description: 'Description 1',
            priority: 'low',
        })

        await createTask.execute({
            title: 'Task 3',
            description: 'Description 1',
            priority: 'high',
        })

        const { tasks } = await sut.execute({ priority: 'low', status: 'pending' })
        expect(tasks.forEach(task => expect(task.priority).toBe('low')))
        expect(tasks.forEach(task => expect(task.status).toBe('pending')))
    })

    it('should return an empty array if no tasks match filters', async () => {
        await createTask.execute({
            title: 'Task 1',
            description: 'Description 1',
            priority: 'low',
        })

        const { tasks } = await sut.execute({ priority: 'high', status: 'completed' })
        expect(tasks).toEqual([])
    })

    it('should return all tasks if no filters are provided', async () => {
        await createTask.execute({
            title: 'Task 1',
            description: 'Description 1',
            priority: 'low',
        })

        await createTask.execute({
            title: 'Task 2',
            description: 'Description 2',
            priority: 'high',
        })

        const { tasks } = await sut.execute({})
        expect(tasks.length).toEqual(2)
    })
})