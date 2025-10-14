import { beforeEach, describe, it, expect } from "vitest";
import { InMemoryTasksRepository } from "../../repositories/in-memory/in-memory-tasks-repository.js";
import { CreateTaskUseCase } from "../create-task.js";
import { UpdateTaskCaseUse } from "../update-task.js";

let taskRepository: InMemoryTasksRepository;
let createTask: CreateTaskUseCase;
let sut: UpdateTaskCaseUse;

describe('Update Task Use Case', () => {

    beforeEach(() => {
        taskRepository = new InMemoryTasksRepository();
        createTask = new CreateTaskUseCase(taskRepository);
        sut = new UpdateTaskCaseUse(taskRepository);
    })

    it('should update a task successfully', async () => {
        const { task } = await createTask.execute({
            title: 'New Task',
            description: 'Task Description',
            priority: 'high',
        })

        const { task: updatedTask } = await sut.execute({
            id: task.id,
            title: 'Updated Task',
            description: 'Updated Description',
            priority: 'low',
            status: 'progress',
        })

        expect(updatedTask.title).toBe('Updated Task');
        expect(updatedTask.description).toBe('Updated Description');
        expect(updatedTask.priority).toBe('low');
        expect(updatedTask.status).toBe('progress');
    })

    it('should not be able to update a task with the same title', async () => {
        await createTask.execute({
            title: 'New Task',
            description: 'Task Description',
            priority: 'high',
        })

        const { task } = await createTask.execute({
            title: 'Another Task',
            description: 'Task Description',
            priority: 'high',
        })

        await expect(
            sut.execute({
                id: task.id,
                title: 'New Task',
                description: 'Task Description',
                priority: 'low',
                status: 'progress',
            })
        ).rejects.toThrowError("Task with this title already exists")
    })

    it('should not be able to update a task with the status completed', async () => {
        const { task } = await createTask.execute({
            title: 'New Task',
            description: 'Task Description',
            priority: 'high',
        })

        const { task: completedTask  } = await sut.execute({
            id: task.id,
            title: 'New Task',
            description: 'Task Description',
            priority: 'high',
            status: 'completed',
        })

        await expect(
            sut.execute({
                id: completedTask.id,
                title: 'Updated Completed Task',
                description: 'Task Description',
                priority: 'low',
                status: 'completed',
            })
        ).rejects.toThrowError("Completed tasks cannot be updated")
    })
})