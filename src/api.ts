import type {TaskResponse, TasksResponse} from "./types";

export const api = {
    getTasks () {
        return fetch('https://trelly.it-incubator.app/api/1.0/boards/tasks', {
            headers: {
                'API-KEY': "f440681b-5422-47ad-a58a-c271babe0751"
            }
        })
            .then((res) => res.json() as Promise<TasksResponse>)
    },
    getTask(taskId: string, boardId: string, signal: AbortSignal) {
        return  fetch(`https://trelly.it-incubator.app/api/1.0/boards/${boardId}/tasks/${taskId}`, {
            signal,
            headers: {
                'API-KEY': "f440681b-5422-47ad-a58a-c271babe0751"
            }
        })
            .then((res) => res.json() as Promise<TaskResponse>)
    }
}