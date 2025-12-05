import type { FastifyInstance } from "fastify";
import { fastifyAdapter } from "./adapters/fastify-adapter.js";
import { CreateTaskController } from "./tasks/create-task-controller.js";
import { DeleteTaskController } from "./tasks/delete-task.js";

export function tasksRoutes(app: FastifyInstance) {
    app.post('/tasks', fastifyAdapter(new CreateTaskController()))
    app.delete('/tasks/:id', fastifyAdapter(new DeleteTaskController()))
}