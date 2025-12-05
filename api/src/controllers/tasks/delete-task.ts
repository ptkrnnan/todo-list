import z, { ZodError } from "zod";
import { TaskNotFoundError } from "../../model/use-cases/errors/task-not-found.js";
import type { HttpController } from "../http-controller.js";
import type { HttpRequest, HttpResponse } from "../types-controller.js";
import { makeDeleteUseCase } from "../factories/make-delete-use-case.js";

export class DeleteTaskController implements HttpController {
    async handle(request: HttpRequest, response: HttpResponse): Promise<void> {
        
        const paramsSchema = z.object({
            id: z.uuid(),
        })
        const { id } = paramsSchema.parse(request.params)
        
        try {
            const deleteUseCase = makeDeleteUseCase()
            await deleteUseCase.execute({ id })
            
            return response.status(204).send()
        } catch (err) {
            if (err instanceof TaskNotFoundError) {
                return response.status(404).send({ message: err.message });
            }
            if (err instanceof ZodError) {
                return response.status(400).send({ message: err.message });
            }
        }

        return response.status(500).send({ message: "Internal server error" });
    }
}