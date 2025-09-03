import type {Task} from "../types";

type Props = {
    task: Task
    isSelected: boolean
    onSelect: (taskId: string) => void
};

export const TaskItem = ({task, isSelected, onSelect}: Props) => {
    const color = isSelected ? "red" : "black"

    return (
        <li style={{color}}>
            <h3 onClick={() => onSelect(task.id)}>{task.attributes.title}</h3>
            <div>Status: {task.attributes.status}</div>
            <div>Priority: {task.attributes.priority}</div>
        </li>
    );
};