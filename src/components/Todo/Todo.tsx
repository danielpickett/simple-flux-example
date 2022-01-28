import './Todo.scss'
import classNames from 'classnames'
import { dispatcher } from '../../stores'

export type Todo = {
  id: string | number
  desc: string
  completed: boolean
}

export const Todo = ({ todo }: { todo: Todo }) => {
  const toggleTodoCompleted = () => {
    dispatcher.dispatch({
      type: 'TOGGLE_TODO_COMPLETE',
      id: todo.id,
    })
  }

  const deleteTodo = () => {
    dispatcher.dispatch({
      type: 'DELETE_TODO',
      id: todo.id,
    })
  }

  const modifierClasses = classNames({
    'Todo--is-completed': todo.completed,
  })

  return (
    <div className={`Todo ${modifierClasses}`}>
      <label className="Todo__label" htmlFor={`todo-${todo.id}`}>
        <input
          id={`todo-${todo.id}`}
          className="Todo__checkbox"
          type="checkbox"
          checked={todo.completed}
          onChange={toggleTodoCompleted}
        />
        <span className="Todo__desc">{todo.desc}</span>
      </label>
      <button
        className="Todo__delete-button"
        type="button"
        onClick={deleteTodo}
      >
        &times;
      </button>
    </div>
  )
}
