// destination-list.component.ts
import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../services/destination.service';
import { Destination } from '../models/destination.model';
import { SelectionType } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.css'],
})
export class DestinationListComponent implements OnInit {
  destinations: Destination[] = [];
  selectionType: SelectionType = SelectionType.single
  selectedRow: Destination[] = []
  constructor(private destinationService: DestinationService, private router: Router) {}

  ngOnInit(): void {
    this.loadDestinations();
  }
  onSelected({ selected }: any) {
    // 'selected' array contains the selected rows
    this.selectedRow = selected;
    this.router.navigate(['/stops/' + this.selectedRow[0].id])
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
}
