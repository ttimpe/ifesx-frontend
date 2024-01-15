import { Route } from "./route.model"

export class Line {
  id: number = 0
  name: string = ''
  type: number = 0
  text_color: string = '#000000'
  color: string = '#00ff00'
  routes?: Route[]
}
