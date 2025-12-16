import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { faCircleH, faTableList, faRoute, faLocationCrosshairs, faVolumeHigh, faMap, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { CalendarService } from './services/calendar.service';
import { BasisVersion } from './models/basis-version.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Route } from './models/route.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule]
})
export class AppComponent {
  title = 'ifesx-frontend';
  faCircleH = faCircleH;
  faTableList = faTableList;
  faRoute = faRoute;
  faLocationCrosshairs = faLocationCrosshairs;
  faVolumeHigh = faVolumeHigh;
  faMap = faMap;
  faCalendar = faCalendar;

  selectedDVID: string | null = localStorage.getItem('selectedDV');
  versionen: BasisVersion[] = [];
  selectedVersion?: BasisVersion;

  constructor(private calendarService: CalendarService) {
    this.calendarService.getVersionen().subscribe({
      next: (versionen) => {
        this.versionen = versionen;

        // Check if the stored ID exists in the fetched versions
        const storedVersion = this.versionen.find(v => v.id === this.selectedDVID);
        if (storedVersion) {
          this.selectedVersion = storedVersion;
        } else {
          // Default to the first version if no match is found
          this.selectedVersion = this.versionen.length > 0 ? this.versionen[0] : undefined;
          this.selectedDVID = this.selectedVersion?.id || null;
          this.saveSelectedVersionId();
        }
      },
      error: (err) => {
        console.error('Error fetching day types:', err);
        // Optionally, show an error notification to the user
      }
    });
  }

  selectVersion(version: BasisVersion): void {
    this.selectedDVID = version.id;
    this.selectedVersion = version;
    this.saveSelectedVersionId();
    console.log('Selected Data Version ID:', this.selectedDVID);
  }

  saveSelectedVersionId(): void {
    if (this.selectedDVID) {
      localStorage.setItem('selectedDV', this.selectedDVID);
    }
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  createVersion(): void {
    console.log('Create new version logic here');
  }
}
