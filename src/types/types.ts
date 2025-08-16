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
