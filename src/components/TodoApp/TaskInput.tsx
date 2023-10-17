import { ChangeEvent, ChangeEventHandler, useState } from "react"
import styles from "./taskInput.module.scss"
import { Todo } from "@/types/todos";

interface TaskInputProps {
    addTodo: (name: string) => void
    currentTodo: Todo | null
    editTodo: (name: string) => void
    finishedEditTodo: () => void
}
export default function TaskInput({ addTodo, currentTodo, editTodo, finishedEditTodo }: TaskInputProps) {
    const [name, setName] = useState<string>();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (currentTodo) {
            finishedEditTodo();
            setName("")
        }
        else {
            addTodo(name as string)
            setName("")
        }
    }

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (currentTodo) {
            editTodo(value)
        }
        setName(value)
    }
    return (
        <div className="mb-2">
            <h1 className={styles.title}>Todo List With TypeScript</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input value={currentTodo ? currentTodo.name : name} type="text" placeholder="Todo..." onChange={onChangeInput} />
                <button type="submit">{currentTodo ? '✔️' : '➕'}</button>
            </form>
        </div>
    )
}
