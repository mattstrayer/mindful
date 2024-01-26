import { v4 as uuidv4 } from 'uuid'
type UUID = string

import { useStore } from '~store'

const store = useStore()

type TaskDefinition = { id?: UUID, name: string, completed?: boolean, createdAt?: Date, completedAt?: Date | null }

export class Task {

  protected _id : UUID

  public name: string
  public completed = false
  public createdAt = null
  public completedAt = null

  constructor(payload: TaskDefinition) {
    this._id = payload.id || uuidv4()
    this.name = payload.name
    this.completed = payload.completed
    this.createdAt = payload.createdAt || new Date()
    this.completedAt = payload.completedAt
  }

  public get id(): UUID {
    return this._id
  }

  public static fromName(name: string): Task {

    const task = new Task({
      name
    })

    // add to store
    store.addTask(task)

    return task
  }

  public static fromObjects(taskObjects: Array<TaskDefinition>): Array<Task> {

    return taskObjects.map((taskObject) => {
      return new Task(taskObject)
    })

  }
}


export class Domain {
  id: UUID
  name: string
  createdAt: Date
  updatedAt: Date
}


