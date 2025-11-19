import type { FastifyInstance } from "fastify";
import { fastifyAdapter } from "./adapters/fastify-adapter.js";
import { CreateTaskController } from "./tasks/create-task-controller.js";

export function tasksRoutes(app: FastifyInstance) {
    app.post('/task', fastifyAdapter(new CreateTaskController()))
}