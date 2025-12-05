import z from "zod";
import type { HttpController } from "../http-controller.js";
import type { HttpRequest, HttpResponse } from "../types-controller.js";
import { makeDeleteUseCase } from "../factories/make-delete-use-case.js";

export class DeleteTaskController implements HttpController {
    async handle(request: HttpRequest, response: HttpResponse): Promise<void> {
        
        // Validando os parâmetros de rota
        // zod lançara uma exceção se a validação falhar
        const paramsSchema = z.object({ id: z.uuid() })
        const { id } = paramsSchema.parse(request.params)

        // Executando o caso de uso
        // realiza a deleção da tarefa
        const deleteUseCase = makeDeleteUseCase()
        await deleteUseCase.execute({ id })

        // Retornando a resposta
        // caso a tarefa seja deletada com sucesso,
        // retornamos o status 204 (No Content)
        return response.status(204).send()
    }
}