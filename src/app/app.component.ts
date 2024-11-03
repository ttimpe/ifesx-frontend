import { Component } from '@angular/core';
import { faCircleH, faTableList, faRoute, faLocationCrosshairs, faVolumeHigh, faMap, faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ifesx-frontend';
  faCircleH = faCircleH
  faTableList = faTableList
  faRoute = faRoute
  faLocationCrosshairs = faLocationCrosshairs
  faVolumeHigh = faVolumeHigh
  faMap = faMap
  faCalendar = faCalendar

}
