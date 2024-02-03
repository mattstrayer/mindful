import { Model } from "pinia-orm"

export default class Intention extends Model {
  static entity = "intentions"
  // List of all fields (schema) of the post model. `this.string()` declares
  // a string field type with a default value as the first argument.
  // `this.uid()` declares a unique id if none provided.
  static fields() {
    return {
      id: this.uid(),
      name: this.string("")
    }
  }
  // For typescript support of the field include also the next lines
  declare id: string
  declare name: string

  static piniaOptions = {
    persist: true
  }
}
