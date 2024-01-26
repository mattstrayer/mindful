import { v4 as uuidv4 } from 'uuid'
type UUID = string



export class Task {

  private id = uuidv4() as UUID

  public completed = false
  public createdAt = new Date()
  public completedAt = null

  constructor(public name: string) {}
}


export class Domain {
  id: UUID
  name: string
  createdAt: Date
  updatedAt: Date
}


