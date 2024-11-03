import { ScheduleService } from './../../services/schedule.service';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';
import { Trip } from 'src/app/models/trip.model';
import { VehicleSchedule } from 'src/app/models/vehicle-schedule.model';
import { Modal } from 'bootstrap'
import { ActivatedRoute, Router } from '@angular/router';
import { TripEditorComponent } from '../trip-editor/trip-editor.component';
@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.css']
})
export class ScheduleDetailComponent {

  schedule: VehicleSchedule = new VehicleSchedule()
  selectionType: SelectionType = SelectionType.single

  constructor(private scheduleService: ScheduleService, private route: ActivatedRoute, private router: Router) {}

  selectedTrip: Trip[] = []

  trips: Trip[] = []

  addTrip() {
    this.router.navigate(['/schedule/' + this.schedule.id + '/trips/add'])
  }
  editTrip() {
    console.log('Edit trip called')

    this.router.navigate(['/schedule/' + this.schedule.id + '/trips/' + this.selectedTrip[0].id])

  }

  deleteTrip() {
    console.log('trying to delete trip')
    if (this.selectedTrip[0]) {
    this.scheduleService.deleteTrip(this.schedule.id, this.selectedTrip[0]).subscribe((dleted) => {
      this.loadSchedule()
    })
  }


  }
  repeatTrip() {
    const minutes = parseInt(prompt('Intervall in Minuten')!)

  }

  ngAfterViewInit() {
    this.loadSchedule()
  }

  saveTrip(trip: Trip) {
    if (trip.id) {
      // Is existing trip, just update

    } else {
      console.log('pushing trip', trip)
      this.schedule.trips.push(trip)
    }
    console.log('schedule is', this.schedule)

  }

  private loadSchedule(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.scheduleService.getScheduleById(Number(id)).subscribe(
        (schedule) => {
          this.schedule = schedule;
          this.scheduleService.getTripsForSchedule(Number(id)).subscribe((trips) => {
            this.trips = [...trips]

          })
        },
        (error) => {
          console.error('Error fetching schedule:', error);
        }
      );
    }
  }

  saveSchedule() {
    console.log('saving')

    let savableSchedule = {...this.schedule}

    savableSchedule.trips.forEach((trip) => {
     // trip.line.routes = []
    })

    if (this.schedule.id) {

      // Update existing line
      this.scheduleService.updateSchedule(savableSchedule ).subscribe(
        (updatedSchedule: VehicleSchedule) => {
          console.log('Schedeule updated:', updatedSchedule);
        },
        (error: any) => {
          console.error('Error updating schedule:', error);
        }
      );
    } else {
      this.scheduleService.createSchedule(this.schedule).subscribe((createdSchedule: VehicleSchedule) => {
        console.log('schedule created', createdSchedule)
      }, (error: any) => {
        console.log('error creating schedule', error)
      })
    }
  }
  onSelected({ selected }: any) {
    this.selectedTrip = selected
  }

}
