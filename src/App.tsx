import './app-styles.css'
import {useEffect, useRef, useState} from "react";
import type {Task, TaskResponse, TasksResponse} from "./types";
import "./app-styles.css"

function App() {
    const [taskQueryStatus, setTaskQueryStatus] = useState<'success' | 'loading'>('loading')
    const [detailQueryStatus, setDetailQueryStatus] = useState<'pending' | 'success' | 'loading'>('pending')

    const [tasks, setTasks] = useState<Task[] | []>([])

    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
    const [selectedTask, setSelectedTask] = useState<TaskResponse | null>(null)
    const abortControllerRef= useRef<AbortController | null>(null)

    useEffect(() => {
        fetch('https://trelly.it-incubator.app/api/1.0/boards/tasks', {
            headers: {
                'API-KEY': "f440681b-5422-47ad-a58a-c271babe0751"
            }
        })
            .then((res) => res.json() as Promise<TasksResponse>)
            .then((json) => {
                setTaskQueryStatus('success')
                setTasks(json.data)
            })
    }, [])

    const handleSelectTaskClickHandler = (taskId: string) => {
        setSelectedTaskId(taskId)
        setDetailQueryStatus('loading')

        abortControllerRef.current?.abort()
        abortControllerRef.current = new AbortController()

        fetch('https://trelly.it-incubator.app/api/1.0/boards/{boardId}/tasks/' + taskId, {
            signal: abortControllerRef.current.signal,
            headers: {
                'API-KEY': "f440681b-5422-47ad-a58a-c271babe0751"
            }
        })
            .then((res) => res.json() as Promise<TaskResponse>)
            .then((json) => {
                setDetailQueryStatus('success')
                setSelectedTask(json)
            })
    }

    return (
        <>
            <h1>Trelly</h1>
            <div style={{'display': 'flex', 'gap': '20px'}}>
                <ul>
                    <h2>Task</h2>
                    {taskQueryStatus === "loading" && <p>Loading...</p>}
                    {taskQueryStatus === "success" && tasks?.map((task) => {
                        const color = task.id === selectedTaskId ? "red" : "black"
                        return (
                            <li style={{color}}>
                                <h3 onClick={() => handleSelectTaskClickHandler(task.id)}>{task.attributes.title}</h3>
                                <div>Status: {task.attributes.status}</div>
                                <div>Priority: {task.attributes.priority}</div>
                            </li>
                        )
                    })}
                </ul>

                <div>
                    <h2>Detail</h2>
                    {detailQueryStatus === 'loading' && <p>Loading...</p>}
                    {detailQueryStatus === 'success' && selectedTask && <div>
                        <h4>{selectedTask.data.attributes.title}</h4>
                        <div>Date: {new Date(selectedTask.data.attributes.addedAt).toLocaleString()}</div>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default App
