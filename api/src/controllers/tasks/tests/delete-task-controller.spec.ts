import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app.js";
import { prisma } from "../../../lib/prisma.js";

describe('Delete Task Controller', () => {
    beforeAll(async () => {
        await app.ready()
        await prisma.task.deleteMany({})
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to delete a task', async () => {
        const createResponse = await request(app.server).post('/tasks').send({
            title: 'Deleted task',
            description: 'Task description',
            priority: 'low'
        })

        const { id } = createResponse.body.task

        const deleteResponse = await request(app.server).delete(`/tasks/${id}`)
        expect(deleteResponse.statusCode).toEqual(204)
    })

    it('should not be able to delete a non-existing task', async () => {
        const deleteResponse = await request(app.server).delete('/tasks/00000000-0000-0000-0000-000000000000')
        expect(deleteResponse.statusCode).toEqual(404)
    })
})
