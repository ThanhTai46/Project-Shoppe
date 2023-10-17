import TaskList from "./TaskList"
import styles from "./TodoList.module.scss"
import TaskInput from "./TaskInput"
import { useState } from "react"
import { Todo } from "@/types/todos"

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

    const handleAddTodo = (name: string) => {
        const todo: Todo = {
            name,
            isDone: false,
            id: new Date().toISOString()
        }
        setTodos(pre => [...pre, todo])
    }

    const handleDoneTodo = (id: string, isDone: boolean) => {
        setTodos((pre) => {
            return pre.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isDone }
                }
                return todo
            })
        })
    }

    const handleEditTodo = (id: string) => {
        const findTodo = todos.find(todo => todo.id === id)
        if (findTodo) setCurrentTodo(findTodo);
    }

    const editTodo = (name: string) => {
        setCurrentTodo((pre) => {
            if (pre) return { ...pre, name }
            return null;
        })
    }

    const finishedEditTodo = () => {
        const handler = (todoObj: Todo[]) => {
            return todoObj.map((todo) => {
                if (todo.id === currentTodo?.id) {
                    return currentTodo
                }
                return todo
            })
        }
        setTodos(handler)
        setCurrentTodo(null)
    }

    const deleteTodo = (id: string) => {
        const handler = (todoObj: Todo[]) => {
            const findedIndexTodo = todoObj.findIndex(todo => todo.id === id)
            if (findedIndexTodo > -1) {
                const result = [...todoObj];
                result.splice(findedIndexTodo, 1)
                return result
            }
            return todoObj
        }
        setTodos(handler)
    }
    const notdoneTodos = todos.filter((todo) => !todo.isDone)
    const doneTodos = todos.filter((todo) => todo.isDone)
    return (
        <div className={styles.todoList}>
            <div className={styles.todoListContainer}>
                <TaskInput
                    finishedEditTodo={finishedEditTodo}
                    addTodo={handleAddTodo}
                    currentTodo={currentTodo}
                    editTodo={editTodo}
                />
                <TaskList todos={notdoneTodos} handleDoneTodo={handleDoneTodo} deleteTodo={deleteTodo} handleEditTodo={handleEditTodo} />

                <TaskList doneTaskList todos={doneTodos} handleDoneTodo={handleDoneTodo} deleteTodo={deleteTodo} handleEditTodo={handleEditTodo} />

            </div>
        </div>
    )
}
