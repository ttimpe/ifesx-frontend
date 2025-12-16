// line-list.component.ts

import { Component, OnInit } from '@angular/core';
import { LineService } from '../../services/line.service';
import { NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { Destination } from '../../models/destination.model';
import { Line } from '../../models/line.model';
import { Router } from '@angular/router';
import { faPenSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TitlebarComponent } from '../titlebar/titlebar.component';

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.css'],
  standalone: true,
  imports: [CommonModule, NgxDatatableModule, FontAwesomeModule, TitlebarComponent]
})
export class LineListComponent implements OnInit {
  lines: Line[] = [];
  selectionType: SelectionType = SelectionType.single
  selectedRow: Line[] = []

  faTrash = faTrash
  faPlus = faPlus
  faPenSquare = faPenSquare

  constructor(private lineService: LineService, private router: Router) { }

  ngOnInit(): void {
    this.lineService.getLines().subscribe(lines => {
      lines.sort((a: Line, b: Line) => {
          return parseInt(a.number) - parseInt(b.number)
      })
      this.lines = lines
    });
  }
  onSelected({ selected }: any) {
    this.selectedRow = selected;
    this.router.navigate(['/lines/' + this.selectedRow[0].id])
  }
  addLine() {

  }
  editLine() {

  }
  deleteLine() {

  }
}
