import { faPenSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
// destination-list.component.ts
import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../../services/destination.service';
import { Destination } from '../../models/destination.model';
import { NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TitlebarComponent } from '../titlebar/titlebar.component';

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.css'],
  standalone: true,
  imports: [CommonModule, NgxDatatableModule, FontAwesomeModule, TitlebarComponent]
})
export class DestinationListComponent implements OnInit {
  destinations: Destination[] = [];
  selectionType: SelectionType = SelectionType.single
  selectedRow: Destination[] = []
  faTrash = faTrash
  faPlus = faPlus
  faPenSquare = faPenSquare

  constructor(private destinationService: DestinationService, private router: Router) {}

  ngOnInit(): void {
    this.loadDestinations();
  }
  onSelected({ selected }: any) {
    // 'selected' array contains the selected rows
    this.selectedRow = selected;
  }
  private loadDestinations(): void {
    this.destinationService.getAllDestinations().subscribe(
      (destinations) => {
        this.destinations = destinations;
      },
      (error) => {
        console.error('Error fetching destinations:', error);
      }
    );
  }
  addDestination() {
    this.router.navigate(['/destinations/add'])

  }
  editDestination() {
    this.router.navigate(['/destinations/' + this.selectedRow[0].id])
  }
  deleteDestination() {

  }
}
