import './app-styles.css'
import {useState} from "react";
import "./app-styles.css"
import {TaskDetail} from "./components/TaskDetail";
import {TasksList} from "./components/TasksList";

function App() {
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)

    return (
        <>
            <h1>Trelly</h1>
            <div style={{'display': 'flex', 'gap': '20px'}}>
                <TasksList selectedTaskId={selectedTaskId} onTaskSelect={(taskId) => setSelectedTaskId(taskId)}/>
                <TaskDetail taskId={selectedTaskId}/>
            </div>
        </>
    )
}

export default App
