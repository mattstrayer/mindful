import { Repository } from "pinia-orm"
import { useCollect } from "pinia-orm/dist/helpers"

import Task from "../models/task"

export default class TaskRepository extends Repository {
  use = Task

  getTodaysTasks() {
    const now = new Date().toDateString()
    const tasks = this.where("createdAtDate", now)
      .orderBy("createdAt", "desc")
      .get()
    return useCollect(tasks).sortBy([["completed", "asc"]])
  }

  getPastTasks() {
    const now = new Date().toDateString()

    const tasks = this.where((task: Task) => {
      return task.createdAtDate < now
    })
      .orderBy("createdAt", "desc")
      .get()

    return useCollect(tasks).sortBy([["completed", "asc"]])
  }
}
