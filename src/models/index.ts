import { v4 as uuidv4 } from "uuid"
import { computed } from "vue"
import { useStore } from "~store"

type UUID = string


type TaskDefinition = {
  id?: UUID
  name: string
  completed?: boolean
  createdAt?: Date | string
  completedAt?: Date | string | null
}


class Base {

  public static get store() {
    return useStore()
  }

  public get store() {
    return Base.store
  }
}

export class Task extends Base {



  protected _id: UUID

  public name: string
  public completed = false
  public createdAt = null
  public completedAt = null

  constructor(payload: TaskDefinition) {
    super()

    this._id = payload.id || uuidv4()
    this.name = payload.name
    this.completed = payload.completed
    this.createdAt = payload.createdAt || new Date()
    this.completedAt = payload.completedAt
  }

  public get id(): UUID {
    return this._id
  }

  public toggle() {
    this.completed = !this.completed
    this.completedAt = this.completed ? new Date() : null
  }

  public static fromName(name: string): Task {
    const task = new Task({
      name
    })

    // add to store
    this.store.addTask(task)

    return task
  }

  public static fromObjects(taskObjects: Array<TaskDefinition>): Array<Task> {
    return taskObjects.map((taskObject) => {
      return new Task(taskObject)
    })
  }

  public static get all()  {
    return this.store.tasks
  }

  public static allSorted() {
      // return sorted copy of tasks, so we don't mutate the original
      return [...this.all].sort((a, b) => {
        if (a.completed && !b.completed) {
          return 1
        } else if (!a.completed && b.completed) {
          return -1
        } else {
          return 0
        }
      })


}
}

