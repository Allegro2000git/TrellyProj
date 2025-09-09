import type {TaskResponse, TasksResponse} from "./types";

export const api = {
    async getTasks ():Promise<TasksResponse>  {
        const res = await fetch('https://trelly.it-incubator.app/api/1.0/boards/tasks', {
            headers: {
                'API-KEY': "xxx"
            }
        })
            const json = await res.json()
            return json
    },
    async getTask(taskId: string, boardId: string, signal?: AbortSignal): Promise<TaskResponse> {
        const res = await fetch(`https://trelly.it-incubator.app/api/1.0/boards/${boardId}/tasks/${taskId}`, {
            signal,
            headers: {
                'API-KEY': "xxx"
            }
        })
        const json = await res.json()
        return json
    }
}