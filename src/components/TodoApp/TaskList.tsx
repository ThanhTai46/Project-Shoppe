import { Todo } from "@/types/todos"
import styles from "./taskList.module.scss"

interface TaskListProps {
    todos: Todo[],
    deleteTodo: (id: string) => void
    handleEditTodo: (id: string) => void;
    handleDoneTodo: (id: string, done: boolean) => void;
    doneTaskList?: boolean
}
export default function TaskList({ todos, handleEditTodo, deleteTodo, handleDoneTodo, doneTaskList }: TaskListProps) {
    const onChangeCheckbox = (idTodo: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        handleDoneTodo(idTodo, event.target.checked)
    }
    return (
        <div className="mb-2">
            <h2 className={styles.title}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h2>
            <div className={styles.tasks}>
                {todos?.map((todo: Todo) => (
                    <div className={styles.task} key={todo.id} >
                        <input
                            type='checkbox'
                            className={styles.taskCheckbox}
                            checked={todo.isDone}
                            onChange={onChangeCheckbox(todo.id)}
                        />
                        <span className={`${styles.taskName} ${todo.isDone ? styles.taskNameDone : ''}`}>{todo.name}</span>
                        <div className={styles.taskActions}>
                            <button className={styles.taskBtn} onClick={() => handleEditTodo(todo.id)}>
                                🖊️
                            </button>
                            <button className={styles.taskBtn} onClick={() => deleteTodo(todo.id)} >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}
