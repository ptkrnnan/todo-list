import z from "zod";
import type { HttpController } from "../http-controller.js";
import type { HttpRequest, HttpResponse } from "../types-controller.js";
import { makeCreateUseCase } from "../factories/make-create-use-case.js";

export class CreateTaskController implements HttpController {
    async handle(request: HttpRequest, response: HttpResponse): Promise<void> {

        const bodySchema = z.object({
           title: z.string().min(3).max(25),
           description: z.string().min(5).max(100),
           priority: z.enum(["low", "medium", "high"])
        })
        const { title, description, priority } = bodySchema.parse(request.body)

        try {
            const createUseCase = makeCreateUseCase()
            const task = await createUseCase.execute({
                title,
                description,
                priority
            })
            return response.status(201).send(task)
        } catch (err) {
            if (err instanceof Error) {
                return response.status(409).send({ message: err.message })
            }
        }
        return response.status(500).send({ message: 'Internal Server Error' })
    }
}