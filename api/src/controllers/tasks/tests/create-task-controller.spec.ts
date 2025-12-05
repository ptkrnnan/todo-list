import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app.js";
import { prisma } from "../../../lib/prisma.js";

describe('Create Task Controller', () => {
    beforeAll(async () => {
        await app.ready()
        await prisma.task.deleteMany({})
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a task', async () => {
        const response = await request(app.server).post('/tasks').send({
            title: 'New Task',
            description: 'Task description',
            priority: 'low'
        })
        
        expect(response.statusCode).toEqual(201)
    })

    it('should not be able to create a task with same title', async () => {
        await request(app.server).post('/tasks').send({
            title: 'New Task',
            description: 'Task description',
            priority: 'low'
        })

        const sameTitle = await request(app.server).post('/tasks').send({
            title: 'New Task',
            description: 'Task description',
            priority: 'low'
        })
        
        expect(sameTitle.statusCode).toEqual(409)
    })
})