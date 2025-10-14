import { randomUUID, type UUID } from "node:crypto";

export type Priority = "high" | "medium" | "low"
export type Status = "completed" | "progress" | "pending"

export class Task {
    public readonly id: UUID
    public title: string
    public description?: string
    public priority: Priority
    public status: Status

    constructor(title: string, description: string, priority: Priority, status: Status) {
        this.id = randomUUID()
        this.title = title
        this.description = description
        this.priority = priority
        this.status = status
        this.validate(title, priority, status)
    }

    validate(title: string, priority: Priority, status: Status) {
        if (!title) throw new Error("Title cannot be empty")
        if (!priority) throw new Error("Priority cannot be empty")
        if (!status) throw new Error("Status cannot be empty")
        if (title.length < 3 || title.length > 25) throw new Error("The title must be 3 and 25 characters long")
    }

    changeTitle(newTitle: string) {
        if (!newTitle) throw new Error("Title cannot be empty")
        this.title = newTitle
    }

    changeDescription(newDescription: string) {
        this.description = newDescription
    }

    changePriority(newPriority: Priority) {
        if (!newPriority) throw new Error("Priority cannot be empty")
        this.priority = newPriority
    }

    changeStatus(newStatus: Status) {
        if (!newStatus) throw new Error("Status cannot be empty")
        this.status = newStatus
    }
}