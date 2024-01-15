import { Stop } from "./stop.model";

export class RouteStop {
  stop_id!: string;
  route_id!: number
  line_id!: number
  sequence_number!: number
  doorSide: number = 1
  hasHighPlatform: boolean = false
  stop?: Stop
}
