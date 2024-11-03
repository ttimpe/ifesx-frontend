import { Component } from '@angular/core';
import { Tagtyp } from 'src/app/models/tagtyp.model';
import { SelectionType } from '@swimlane/ngx-datatable';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calender-overview',
  templateUrl: './calender-overview.component.html',
  styleUrls: ['./calender-overview.component.css'],
  providers: [ DatePipe ]
})
export class CalenderOverviewComponent {
  daytypes: Tagtyp[] = []
  selectedDayType: Tagtyp[] = []
  selectionType: SelectionType = SelectionType.single

  _beginDate: Date = new Date()
  _endDate: Date = new Date()


  constructor(private datePipe: DatePipe) {

  }
  get beginDate(): string {
    return this.datePipe.transform(this._beginDate, 'dd-MM-yyyy') || "";
  }

  set beginDate(dateString: string) {
    this._beginDate = new Date(dateString);
  }

  get endDate(): string  {
    return this.datePipe.transform(this._endDate, 'dd-MM-yyyy') || "";
  }

  set endDate(dateString: string) {
    this._endDate = new Date(dateString);
  }

  onSelected({ selected }: any) {
    // 'selected' array contains the selected rows
    this.selectedDayType = selected;
  }
  addDaytype() {

  }
  editDaytype() {

  }
  deleteDaytype() {

  }
  eventDayClickHandler() {

  }
}
