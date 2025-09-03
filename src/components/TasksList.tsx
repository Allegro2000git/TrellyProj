import {useEffect, useState} from "react";
import {api} from "../api";
import type {Task} from "../types";
import {TaskItem} from "./TaskItem";


type Props = {
    onTaskSelect: (taskId: string) => void
    selectedTaskId: string | null
};


export const TasksList = ({onTaskSelect, selectedTaskId}: Props) => {
    const [taskQueryStatus, setTaskQueryStatus] = useState<'success' | 'loading'>('loading')
    const [tasks, setTasks] = useState<Task[] | []>([])


    useEffect(() => {
        api.getTasks().then((json) => {
            setTaskQueryStatus('success')
            setTasks(json.data)
        })
    }, [])

    return (
        <ul>
            <h2>Task</h2>
            {taskQueryStatus === "loading" && <p>Loading...</p>}
            {tasks?.map((task) => <TaskItem onSelect={onTaskSelect} task={task} isSelected={task.id === selectedTaskId}/>)}
        </ul>
    );
};