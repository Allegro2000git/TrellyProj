import {useEffect, useRef, useState} from "react";
import type {Task} from "../types";
import {api} from "../api";

type Props = {
    taskId: string | null
};


export const TaskDetail = ({taskId}: Props) => {
    const [detailQueryStatus, setDetailQueryStatus] = useState<'pending' | 'success' | 'loading'>('pending')
    const [task,setTask]= useState<Task | null>(null)
    const abortControllerRef= useRef<AbortController | null>(null)

    useEffect(() => {
        abortControllerRef.current?.abort()
        if (!taskId) {
            setTask(null)
            setDetailQueryStatus('pending')
            return
        }
        abortControllerRef.current = new AbortController()

        setDetailQueryStatus('loading')

        api.getTask(taskId, abortControllerRef.current.signal)
            .then(json => {
                setDetailQueryStatus('success')
                setTask(json.data)
            })
    }, [taskId]);


        if (detailQueryStatus === 'loading') {
            return <div>Loading...</div>
        }

        if (detailQueryStatus === 'pending') {
            return <span>Not task for display</span>
        }


        return (
            <div>
                <h2>Detail</h2>
                <h4>{task?.attributes.title}</h4>
                <div>Date: {new Date(task?.attributes.addedAt).toLocaleString()}</div>
            </div>
        );
    }