import { Stop } from "./stop.model";

export class RouteStop {
  id!: number
  stop_id!: string;
  route_id!: number
  line_id!: number
  sequence_number!: number
  doorSide: number = 0
  hasHighPlatform: boolean = false
  stop?: Stop
}
