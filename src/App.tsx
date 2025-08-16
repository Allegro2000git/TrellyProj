import './app-styles.css'
import {Fragment, useEffect, useState} from "react";
import type {Task, TasksResponse} from "./types";
import "./app-styles.css"
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {CreateItemForm} from "./components/CreateItemForm/CreateItemForm";

function App() {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        fetch('https://trelly.it-incubator.app/api/1.0/boards/tasks', {
            headers: {
                'API-KEY': "f440681b-5422-47ad-a58a-c271babe0751"
            }
        })
            .then((res) => res.json() as Promise<TasksResponse>)
            .then((json) => {
                console.log(json)
                setTasks(json.data)
            })
    }, [])

    const changeTitleHandler = () => {}

    const createItemHandler = () => {}

    return (
        <div>
            <div>
                <CreateItemForm onCreateItem={createItemHandler}/>
            </div>
            <div>
                <table className={"tasks-table"}>
                    <tbody>
                    {tasks.map((task) => (
                        <Fragment key={task.attributes.id}>
                            <tr>
                                <th>Заголовок</th>
                                <td><EditableSpan value={task.attributes.title} onChange={changeTitleHandler}/></td>
                            </tr>
                            <tr>
                                <th>Статус</th>
                                <td>{task.attributes.status}</td>
                            </tr>
                            <tr>
                                <th>Приоритет</th>
                                <td>{task.attributes.priority}</td>
                            </tr>
                        </Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default App
