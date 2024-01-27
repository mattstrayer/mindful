import { v4 as uuidv4 } from "uuid"

type IntentionDefinition = {
  id?: UUID
  name: string
}
export default class Intention {
  protected id: UUID
  public name: string

  constructor(payload: IntentionDefinition) {
    this.name = payload.name
    this.id = payload.id || uuidv4()
  }

  public static fromObjects(intentionObjects: Array<IntentionDefinition>) {
    return intentionObjects.map((intention) => {
      return new Intention(intention)
    })
  }
}
