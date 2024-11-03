import { RouteStop } from "./route-stop.model"

export class StopTime {
  id?: number
  stop?: RouteStop
  route_stop_id!: number
  tripId?: number
  arrivalTime?: number
  departureTime?: number
}
