
type UUID = string


export class Task {
  id: UUID
  name: string
  description: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}


export class Domain {
  id: UUID
  name: string
  createdAt: Date
  updatedAt: Date
}


