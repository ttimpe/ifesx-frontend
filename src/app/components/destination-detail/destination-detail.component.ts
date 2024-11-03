// destination-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinationService } from '../../services/destination.service';
import { Destination } from '../../models/destination.model';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-destination-detail',
  templateUrl: './destination-detail.component.html',
  styleUrls: ['./destination-detail.component.css'],
})
export class DestinationDetailComponent implements OnInit {
  destination: Destination | undefined;
  faChevronLeft = faChevronLeft

  constructor(
    private route: ActivatedRoute,
    private destinationService: DestinationService
  ) {}

  ngOnInit(): void {
    this.loadDestination();
  }

  private loadDestination(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.destinationService.getDestinationById(Number(id)).subscribe(
        (destination) => {
          this.destination = destination;
        },
        (error) => {
          console.error('Error fetching destination:', error);
        }
      );
    }
  }
  saveDestination() {
    console.log('saving')
    if (this.destination) {

      // Update existing line
      this.destinationService.updateDestination(this.destination).subscribe(
        (updatedDestination: Destination) => {
          console.log('Destination updated:', updatedDestination);
        },
        (error: any) => {
          console.error('Error updating destination:', error);
        }
      );
    }
  }

}
