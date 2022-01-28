import { EventEmitter } from 'events'
import { Dispatcher } from 'flux'
import { Todo } from '../components'
import { Action, Id } from '../types'

export const dispatcher = new Dispatcher<Action>()

class TodoStore extends EventEmitter {
  constructor() {
    super()
    this.todos = [
      { id: 1, desc: 'Go shopping', completed: false },
      { id: 2, desc: 'Pay water bills', completed: false },
    ]
  }

  todos: Todo[]

  get() {
    return this.todos
  }

  createTodo(desc: string) {
    const id = Date.now()
    this.todos.push({
      id,
      desc,
      completed: false,
    })
    this.emit('change')
  }

  toggleTodoComplete(id: Id) {
    const newTodos = [
      ...this.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    ]
    this.todos = newTodos
    this.emit('change')
  }

  deleteTodo(id: Id) {
    this.todos = this.todos.filter((todo) => todo.id !== id)
    this.emit('change')
  }

  handleActions(action: Action) {
    switch (action.type) {
      case 'CREATE_TODO': {
        this.createTodo(action.desc)
        break
      }
      case 'TOGGLE_TODO_COMPLETE': {
        this.toggleTodoComplete(action.id)
        break
      }
      case 'DELETE_TODO': {
        this.deleteTodo(action.id)
        break
      }
    }
  }
}

const todoStore = new TodoStore()
dispatcher.register(todoStore.handleActions.bind(todoStore))

export default todoStore

declare global {
  interface Window {
    todoStore: TodoStore
    dispatcher: typeof dispatcher
  }
}

window.todoStore = todoStore
window.dispatcher = dispatcher
