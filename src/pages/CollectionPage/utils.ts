import type { DocumentStatus } from "./types/documentStatus";

const statusLabels: Record<DocumentStatus, string> = {
    0: "Pending",
    1: "In Progress",
    2: "Completed",
};

export const getStatusLabel = (status: DocumentStatus): string =>
    statusLabels[status] ?? "Pending";
