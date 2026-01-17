import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Tooltip } from 'primeng/tooltip';
import { Router } from '@angular/router';
import { faTrash, faPlus, faCircleH } from '@fortawesome/free-solid-svg-icons'
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StopService } from '../../services/stop.service';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-stop-list',
  templateUrl: './stop-list.component.html',
  styleUrls: ['./stop-list.component.css'],
  standalone: true,
  imports: [CommonModule, TableModule, FontAwesomeModule, Button, InputText]
})
export class StopListComponent implements OnInit {
  recOrts: any[] = [] // RecOrts
  selectedStop: any | null = null;
  faTrash = faTrash
  faPlus = faPlus
  faCircleH = faCircleH
  selectedBasisVersion: number | undefined;

  @ViewChild('dt') dt: Table | undefined;

  constructor(private stopService: StopService, private router: Router, private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.calendarService.selectedVersion$.subscribe(version => {
      this.selectedBasisVersion = version || undefined;
      this.loadStops();
    });
  }

  loadStops() {
    this.stopService.getAllRecOrts('', this.selectedBasisVersion).subscribe((data: any[]) => {
      this.recOrts = data;
    });
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  addStop() {
    this.router.navigate(['/stops/add'])
  }

  editStop(stop: any) {
    this.router.navigate(['/stops/' + stop.ORT_NR], {
      queryParams: {
        basisVersion: stop.BASIS_VERSION,
        onrTypNr: stop.ONR_TYP_NR
      }
    });
  }

  deleteStop(stop: any, event: Event) {
    event.stopPropagation(); // Prevent row click

    if (!confirm(`Haltestelle "${stop.ORT_NAME}" (${stop.ORT_NR}) wirklich löschen?`)) {
      return;
    }

    this.stopService.deleteRecOrt(stop.ORT_NR).subscribe({
      next: () => {
        this.recOrts = this.recOrts.filter(s => s.ORT_NR !== stop.ORT_NR);
        console.log('Stop deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting stop:', err);
        alert('Fehler beim Löschen der Haltestelle');
      }
    });
  }
}
