export interface Task {
  id: string
  name: string
  completed: boolean
  createdAt?: Date
  completedAt?: Date
}

export interface Intention {
  id: string
  name: string
  completed: boolean
}
