import { randomUUID, type UUID } from "node:crypto";
import { TitleCannotBeEmptyError } from "./errors/title-cannot-empty.js";
import { PriorityCannotBeEmptyError } from "./errors/priority-cannot-empty.js";
import { StatusCannotBeEmptyError } from "./errors/status-cannot-empty.js";

export type Priority = "high" | "medium" | "low"
export type Status = "completed" | "progress" | "pending"

type TaskProps = {
    title: string,
    description?: string,
    priority: Priority,
    status: Status
}

export class Task {
    public readonly id: UUID
    public title: string
    public description: string | undefined
    public priority: Priority
    public status: Status

    constructor({ title, description, priority, status }: TaskProps) {
        this.id = randomUUID()
        this.title = title
        this.description = description
        this.priority = priority
        this.status = status
        this.validate(title, priority, status)
    }

    validate(title: string, priority: Priority, status: Status) {
        if (!title) throw new TitleCannotBeEmptyError()
        if (!priority) throw new PriorityCannotBeEmptyError()
        if (!status) throw new StatusCannotBeEmptyError()
        if (title.length < 3 || title.length > 25) throw new Error("The title must be 3 and 25 characters long")
    }

    changeTitle(newTitle: string) {
        if (!newTitle) throw new TitleCannotBeEmptyError()
        this.title = newTitle
    }

    changeDescription(newDescription: string) {
        this.description = newDescription
    }

    changePriority(newPriority: Priority) {
        if (!newPriority) throw new PriorityCannotBeEmptyError()
        this.priority = newPriority
    }

    changeStatus(newStatus: Status) {
        if (!newStatus) throw new StatusCannotBeEmptyError()
        this.status = newStatus
    }
}