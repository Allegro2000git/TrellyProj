import { type ChangeEvent, type KeyboardEvent, useState } from "react"

type Props = {
    onCreateItem: (title: string) => void
    disabled?: boolean
}

export const CreateItemForm = ({ onCreateItem, disabled }: Props) => {
    const [title, setTitle] = useState("")

    const createItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            onCreateItem(trimmedTitle)
            setTitle("")
        }
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            createItemHandler()
        }
    }

    return (
        <div>
            <input
                value={title}
                onChange={changeTitleHandler}
                onKeyDown={createItemOnEnterHandler}
                disabled={disabled}
                style={{marginRight: "10px"}}
            />
            <button onClick={createItemHandler} color={"yellow"} disabled={disabled}>Добавить</button>
        </div>
    )
}