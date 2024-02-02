import { Repository } from 'pinia-orm'
import Intention from '../models/intention'

export default class IntentionRepository extends Repository {
  use = Intention


}
