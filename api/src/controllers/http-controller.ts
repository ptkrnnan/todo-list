import type { HttpRequest, HttpResponse } from "./types-controller.js";

export interface HttpController<Request = HttpRequest, Response = HttpResponse> {
    handle(request: Request, response: Response): Promise<void>
}