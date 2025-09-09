import {api} from "../api";
import type {Task} from "../types";
import {TaskItem} from "./TaskItem";
import {useQuery} from "../hooks/utils/useQuery";


type Props = {
    onTaskSelect: (task: Task | null) => void
    selectedTaskId: string | null | undefined
};

export const TasksList = ({onTaskSelect, selectedTaskId}: Props) => {

    const {status, data} = useQuery({
        queryFn: () => api.getTasks(),
        queryKey: ['tracks']
    })

    if (status === "loading") {
        return <p>Loading...</p>
    }

    return (
        <ul>
            <h2>Task</h2>
            {data?.data.map((task) => <TaskItem key={task.id} onSelect={onTaskSelect} task={task} isSelected={task.id === selectedTaskId}/>)}
        </ul>
    );
};