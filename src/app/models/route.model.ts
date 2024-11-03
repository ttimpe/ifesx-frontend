import { Destination } from "./destination.model"
import { Line } from "./line.model"
import { RouteStop } from "./route-stop.model"
import { SpecialCharacter } from "./special-character.model"

export class Route {
  id!: number
  number!: number
  line_id!: string
  line!: Line
  stops: RouteStop[] = []
  direction!: number
  destination_id!: number
  destination!: Destination
  routeDestination!: Destination
  specialCharacter!: SpecialCharacter
  special_character_id!: number
}
