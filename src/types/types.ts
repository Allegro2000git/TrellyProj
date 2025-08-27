type TaskAttributes = {
    id: string;
    title: string;
    boardId: string;
    status: number;
    priority: number;
    addedAt: string;
    attachmentsCount: number;
};

export type Task = {
    id: string;
    type: "tasks";
    attributes: TaskAttributes;
};

type Meta = {
    page: number;
    pageSize: number;
    totalCount: number;
    pagesCount: number;
};

export type TasksResponse = {
    data: Task[];
    meta: Meta;
};

export type TaskAttributesFull = TaskAttributes & {
    description: Record<string, unknown> | null;
    boardTitle: string,
    order: number,
    startDate: Record<string, unknown> | null;
    deadline: Record<string, unknown> | null;
    updatedAt: string,
    attachments: string[],
};

export type TaskDataItemFull = {
    id: string;
    type: "tasks";
    attributes: TaskAttributesFull;
};

export type TaskResponse = {
    data: TaskDataItemFull
};