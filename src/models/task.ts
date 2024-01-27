import { v4 as uuidv4 } from "uuid"

import { useStore } from "~/store"

type TaskDefinition = {
  id?: UUID
  name: string
  completed?: boolean
  createdAt?: Date | string
  completedAt?: Date | string | null
}

export default class Task {
  public id: UUID

  public name: string
  public completed = false
  public createdAt: Datelike = null
  public completedAt: Datelike = null

  private stringToDate(dateString: string) {
    if (dateString) {
      return new Date(dateString)
    }
  }

  private parseDate(date: Datelike): Date {
    if (typeof date === "string") {
      return this.stringToDate(date)
    }
    return date
  }

  constructor(payload: TaskDefinition) {
    this.id = payload.id || uuidv4()
    this.name = payload.name
    this.createdAt = this.parseDate(payload.createdAt) || new Date()
    this.completedAt = this.parseDate(payload.completedAt)
    this.completed = payload.completed || false
  }

  public static fromObjects(taskObjects: Array<TaskDefinition>) {
    return taskObjects.map((task) => {
      return new Task(task)
    })
  }

  public toggle() {
    useStore().toggleTask(this.id)
  }

  public static fromName(name: string): Task {
    const task = new Task({
      name
    })

    // add to store
    useStore().addTask(task)

    return task
  }

  public static sorted(tasks: Array<Task>) {
    // return sorted copy of tasks, so we don't mutate the original
    return [...tasks].sort((a, b) => {
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
