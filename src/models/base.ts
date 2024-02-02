import { Model } from 'pinia-orm'
export default class Base extends Model {
  static entity = 'intentions'

  static fields () {
    return {
      id: this.uid(),
    }
  }
  declare id: string

  static piniaOptions = {
    persist: true
  }
}
