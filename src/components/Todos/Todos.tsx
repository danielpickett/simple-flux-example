import { useEffect, useState } from 'react'
import './Todos.scss'
import { Todo } from '../Todo'
import TodoStore from '../../stores/todosStore'
import { NewTodoForm } from '../NewTodoForm'
import { Spacer } from '../Spacer'

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => TodoStore.get())

  useEffect(() => {
    TodoStore.on('change', () => setTodos([...TodoStore.get()]))
  }, [])

  return (
    <div className="Todos">
      <h1>Todos</h1>

      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
      <Spacer />
      <NewTodoForm />
    </div>
  )
}
