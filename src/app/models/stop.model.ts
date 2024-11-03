import { StopInformation } from "./stop-information.model"

export class Stop  {
  id!: string
  parent_id?: string
  longitude!: number
  latitude!:number
  name!: string
  information!: StopInformation

  get stopType(): number {
    console.log('getStopType')
    const parts = this.id.split(':')
    if (parts.length = 5) {
      const type = parseInt(parts[4][0])
      return type
    }
    return 0

  }

}


