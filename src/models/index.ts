
type UUID = string



export class Task {

  constructor(public id: UUID, public name: string, public description: string, public completed: boolean, public createdAt: Date, public updatedAt: Date) { }


}


export class Domain {
  id: UUID
  name: string
  createdAt: Date
  updatedAt: Date
}


