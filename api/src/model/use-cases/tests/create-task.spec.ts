import { beforeEach, describe, it, expect } from "vitest";
import { InMemoryTasksRepository } from "../../repositories/in-memory/in-memory-tasks-repository.js";
import { CreateTaskUseCase } from "../create-task.js";
import { TitleAlreadyExistsError } from "../errors/title-already-exists.js";

let taskRepository: InMemoryTasksRepository;
let sut: CreateTaskUseCase;

describe('Create Task Use Case', () => {

    beforeEach(() => {
        taskRepository = new InMemoryTasksRepository();
        sut = new CreateTaskUseCase(taskRepository);
    })

    it('should create a task successfully', async () => {
        const { task } = await sut.execute({
            title: 'New Task',
            description: 'Task Description',
            priority: 'high',
        })

        expect(task.title).toBe('New Task');
        expect(task.description).toBe('Task Description');
        expect(task.priority).toBe('high');
        expect(task.status).toBe('pending');
    })

    it('should not be able create a task with the same title', async () => {
        await sut.execute({
            title: 'New Task',
            description: 'Task Description',
            priority: 'high',
        })

        await expect(
            sut.execute({
                title: 'New Task',
                description: 'Another Description',
                priority: 'low',
            })
        ).rejects.toThrowError(TitleAlreadyExistsError);
    })
})