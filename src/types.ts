export type Id = string | number

type CreateTodoAction = {
  type: 'CREATE_TODO'
  desc: string
}

type DeleteTodoAction = {
  type: 'DELETE_TODO'
  id: Id
}

type TogleTodoCompleteAction = {
  type: 'TOGGLE_TODO_COMPLETE'
  id: Id
}

export type Action =
  | CreateTodoAction
  | DeleteTodoAction
  | TogleTodoCompleteAction
