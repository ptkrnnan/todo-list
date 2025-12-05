import type { FastifyReply, FastifyRequest } from "fastify";
import type { HttpController } from "../http-controller.js";
import type { HttpRequest, HttpResponse } from "../types-controller.js";

// Importando erros específicos para tratamento
import { ZodError } from "zod";
import { TaskNotFoundError } from "../../model/use-cases/errors/task-not-found.js";
import { TitleAlreadyExistsError } from "../../model/use-cases/errors/title-already-exists.js";

export function fastifyAdapter(controller: HttpController) {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        const httpRequest: HttpRequest ={
            body: request.body ?? {},
            params: request.params ?? {},
            query: request.query ?? {},
            headers: request.headers ?? {},
        }

        const httpResponse: HttpResponse = {
            status(code: number) {
                reply.status(code)
                return this
            },
            send(body?: any) {
                reply.send(body)
            }
        }
        
        try {
            // Chamando o controlador HTTP com a requisição e resposta adaptadas
            await controller.handle(httpRequest, httpResponse)
        }
        catch (err) {

            // Lidando com erro de título já existente
            if (err instanceof TitleAlreadyExistsError) {
                reply.status(409).send({ message: 'Title already exists' })
            }

            // Lidando com erro de tarefa não encontrada
            if (err instanceof TaskNotFoundError) {
                reply.status(404).send({ message: 'Task not found' })
            }

            // Lidando com erros de validação do Zod
            if (err instanceof ZodError) {
                reply.status(400).send({ message: 'Validation Error', issues: err.issues })
            }

            // Para outros erros, retornamos um erro genérico 500
            reply.status(500).send({ message: 'Internal Server Error' })
        }
    }
}