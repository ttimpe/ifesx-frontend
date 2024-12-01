import { Component } from '@angular/core';
import { faCircleH, faTableList, faRoute, faLocationCrosshairs, faVolumeHigh, faMap, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { CalendarService } from './services/calendar.service';
import { BasisVersion } from './models/basis-version.model';

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

  selectedDVID: string | null = localStorage.getItem('selectedDV')
  versionen: BasisVersion[] = []
  
  constructor(private calendarService: CalendarService) {
    this.calendarService.getVersionen().subscribe({
      next: (versionen) => {
        this.versionen = versionen;
        if (this.versionen.length == 0) {
          console.log('Keine DV vorhanden')
        }
        if (this.versionen.length == 1) {
          this.selectedDVID = this.versionen[0].id
        }
        if (this.selectedDVID == null) {
          console.log('Keine DV gewählt, User soll wählen, oder erstellen')
        }   
      },
      error: (err) => {
        console.error('Error fetching day types:', err);
        // Optionally, show an error notification to the user
      }

    });

 

  }
}
