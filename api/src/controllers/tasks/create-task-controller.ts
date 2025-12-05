import z from "zod";
import type { HttpController } from "../http-controller.js";
import type { HttpRequest, HttpResponse } from "../types-controller.js";
import { makeCreateUseCase } from "../factories/make-create-use-case.js";

export class CreateTaskController implements HttpController {
    async handle(request: HttpRequest, response: HttpResponse): Promise<void> {

        // Validando o corpo da requisição
        // zod lançara uma exceção se a validação falhar
        const bodySchema = z.object({
           title: z.string().min(3).max(25),
           description: z.string().min(5).max(100),
           priority: z.enum(["low", "medium", "high"])
        })
        const { title, description, priority } = bodySchema.parse(request.body)

        // Executando o caso de uso
        // realiza a criação da tarefa
        const createUseCase = makeCreateUseCase()
        const task = await createUseCase.execute({
            title,
            description,
            priority
        })

        // retornando a resposta com a tarefa criada
        // status 201 Created
        return response.status(201).send(task)
    }
}