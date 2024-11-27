import { CalendarService } from './../../services/calendar.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Tagesart } from 'src/app/models/tagesart.model';
import { SelectionType } from '@swimlane/ngx-datatable';
import { DatePipe } from '@angular/common';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calender-overview',
  templateUrl: './calender-overview.component.html',
  styleUrls: ['./calender-overview.component.css'],
  providers: [ DatePipe ]
})
export class CalenderOverviewComponent {
  daytypes: Tagesart[] = []



  selectedDayType: Tagesart | undefined
  selectionType: SelectionType = SelectionType.single

  _beginDate: Date = new Date()
  _endDate: Date = new Date()


  editDaytypeModal: Modal | undefined

  constructor(private datePipe: DatePipe, private modalService: NgbModal, private calendarService: CalendarService) {

  }
  get beginDate(): string {
    return this.datePipe.transform(this._beginDate, 'yyyy-MM-dd') || "";
  }

  set beginDate(dateString: string) {
    this._beginDate = new Date(dateString);
  }

  get endDate(): string  {
    return this.datePipe.transform(this._endDate, 'yyyy-MM-dd') || "";
  }

  set endDate(dateString: string) {
    this._endDate = new Date(dateString);
  }

  onSelected({ selected }: any) {
    // 'selected' array contains the selected rows
    this.selectedDayType = selected;
    console.log(selected)
  }

  addDaytype() {
  }

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  editDaytype() {

  }

  saveTagesart() {
    console.log('will save tagesart')
  }
  deleteDaytype() {

  }
  eventDayClickHandler() {

  }
}
