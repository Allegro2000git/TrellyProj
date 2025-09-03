import './app-styles.css'
import {useState} from "react";
import "./app-styles.css"
import {TaskDetail} from "./components/TaskDetail";
import {TasksList} from "./components/TasksList";
import type {Task} from "./types";

function App() {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)

    return (
        <>
            <h1>Trelly</h1>
            <div style={{'display': 'flex', 'gap': '20px'}}>
                <TasksList selectedTaskId={selectedTask?.id} onTaskSelect={(task) => setSelectedTask(task)}/>
                <TaskDetail taskId={selectedTask?.id} boardId={selectedTask?.attributes.boardId}/>
            </div>
        </>
    )
}

export default App
