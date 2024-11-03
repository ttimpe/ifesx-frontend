import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Stop } from '../../models/stop.model';
import { Router } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-stop-list',
  templateUrl: './stop-list.component.html',
  styleUrls: ['./stop-list.component.css']
})
export class StopListComponent implements OnInit {
  stops: Stop[] = []
  selectionType: SelectionType = SelectionType.single
  selectedRow: Stop[] = []
  temp: Stop[] = []
  faTrash = faTrash
  faPlus = faPlus
  faPenSquare = faPenSquare

  @ViewChild(DatatableComponent) table?: DatatableComponent;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/stops').subscribe(stops => {
      this.stops = stops;
      this.temp = stops;
    });
  }
  onSelected({ selected }: any) {
    // 'selected' array contains the selected rows
    this.selectedRow = selected;
  }
  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    const exactMatch = this.temp.filter(function (d) {
      if (d.information.code && d.information.code) {
        return d.information.code.toLowerCase().indexOf(val) !== -1 || !val;
      }
      return false;
    });

    if (exactMatch.length == 0) {

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.stops = temp;
  } else {
    this.stops = exactMatch;
  }
    // Whenever the filter changes, always go back to the first page
    if (this.table) {
    this.table.offset = 0;
    }
  }
  addStop() {
    this.router.navigate(['/stops/add'])

  }
  editStop() {
    this.router.navigate(['/stops/' + this.selectedRow[0].id])

  }
  deleteStop() {

  }
}
