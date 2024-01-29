export type Id = string | number

export interface Task {
  id: Id
  title: string
  description: string
  columnId: Id
}

export interface Column {
  id: Id
  title: string
}
