import { beforeEach, describe, it, expect } from "vitest";
import { InMemoryTasksRepository } from "../../repositories/in-memory/in-memory-tasks-repository.js";
import { CreateTaskUseCase } from "../create-task.js";
import { DeleteTaskUseCase } from "../delete-task.js";

let taskRepository: InMemoryTasksRepository;
let createTask: CreateTaskUseCase;
let sut: DeleteTaskUseCase

describe('Delete Task Use Case', () => {

    beforeEach(() => {
        taskRepository = new InMemoryTasksRepository();
        createTask = new CreateTaskUseCase(taskRepository);
        sut = new DeleteTaskUseCase(taskRepository);
    })

    it('should delete a task successfully', async () => {
        const { task } = await createTask.execute({
            title: 'New Task',
            description: 'Task Description',
            priority: 'high',
        })

        await sut.execute({
            id: task.id
        })

        const foundTask = await taskRepository.findById(task.id)
        expect(foundTask).toBeNull()
    })
})