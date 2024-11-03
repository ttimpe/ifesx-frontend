import { Line } from "./line.model"
import { Route } from "./route.model"
import { StopTime } from "./stop-time.model"

export class Trip {
  id?: number
  courseNumber: number = 0
  route?: Route
  routeId?: number
  departureTime?: number
  arrivalTime?: number
  turnaroundTime: number = 0
  stopTimes: StopTime[] = []
}
