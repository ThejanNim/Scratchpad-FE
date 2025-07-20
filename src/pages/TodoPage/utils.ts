import type { TodoStatus } from "./types/todoStatus";

const statusLabels: Record<TodoStatus, string> = {
    0: "Pending",
    1: "In Progress",
    2: "Completed",
};

export const getStatusLabel = (status: TodoStatus): string =>
    statusLabels[status] ?? "Pending";