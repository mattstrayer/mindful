import { Model } from "pinia-orm"
import { DateCast } from "pinia-orm/dist/casts"

export default class Task extends Model {
  static entity = "tasks"

  static fields() {
    return {
      id: this.uid(),
      name: this.string(""),
      completed: this.boolean(false),
      createdAt: this.string(new Date()),
      completedAt: this.string(null)
    }
  }

  declare id: string
  declare name: string
  declare completed: boolean
  declare createdAt: Date
  declare completedAt: Date

  get createdAtDate() {
    return new Date(this.createdAt).toDateString()
  }

  static piniaOptions = {
    persist: true
  }

  static casts() {
    return {
      createdAt: DateCast,
      compltedAt: DateCast
    }
  }
}
