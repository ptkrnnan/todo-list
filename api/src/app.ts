import fastify from "fastify";
import { tasksRoutes } from "./controllers/routes.js";

export const app = fastify()

app.register(tasksRoutes)