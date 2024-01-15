import { RouteStop } from "./route-stop.model"

export class Route {
  route_id!: number
  line_id!: number
  stops: RouteStop[] = []
}
