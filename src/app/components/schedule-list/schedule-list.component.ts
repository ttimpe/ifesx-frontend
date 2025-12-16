import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { VehicleSchedule } from 'src/app/models/vehicle-schedule.model';
import { ScheduleService } from 'src/app/services/schedule.service';
import { TitlebarComponent } from '../titlebar/titlebar.component';
@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css'],
  standalone: true,
  imports: [CommonModule, NgxDatatableModule, FontAwesomeModule, FormsModule, TitlebarComponent]
})

export class ScheduleListComponent {

  selectionType: SelectionType = SelectionType.single
  selectedRow: VehicleSchedule[] = []
  faTrash = faTrash
  faPlus = faPlus
  faPenSquare = faPenSquare

  schedules: VehicleSchedule[] = []

  constructor(private router: Router, private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.loadSchedules()

}



  onSelected(i: any) {

  }

  private loadSchedules(): void {
    this.scheduleService.getAllSchedules().subscribe(
      (schedules: VehicleSchedule[]) => {
        this.schedules = schedules;
      },
      (error: any) => {
        console.error('Error fetching schedules:', error);
      }
    );
  }

  addSchedule() {
    this.router.navigate(['/schedule/add'])

  }



  editSchedule() {
    this.router.navigate(['/schedule/' + this.selectedRow[0].id])


  }
  deleteSchedule() {

  }
}
