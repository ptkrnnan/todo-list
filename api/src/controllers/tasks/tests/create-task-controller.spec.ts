import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app.js";

describe('Create Task Controller', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a task', async () => {
        const response = await request(app.server).post('/task').send({
            title: 'New Task',
            description: 'Task description',
            priority: 'low'
        })
        
        expect(response.statusCode).toEqual(201)
    })
})