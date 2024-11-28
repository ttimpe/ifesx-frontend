import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { CalendarService } from '../../services/calendar.service';
import { Tagesart } from 'src/app/models/tagesart.model';
import { SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-calendar-overview',
  templateUrl: './calendar-overview.component.html',
  styleUrls: ['./calendar-overview.component.css'],
  providers: [DatePipe]
})
export class CalendarOverviewComponent implements OnInit {
  daytypes: Tagesart[] = []; // List of day types
  selectedDayType: Tagesart | undefined; // Selected day type for editing or deleting
  selectionType: SelectionType = SelectionType.single;

  _beginDate: Date = new Date(); // Start date
  _endDate: Date = new Date(); // End date

  constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.loadDayTypes();
  }

  // Getter and Setter for date inputs
  get beginDate(): string {
    return this.datePipe.transform(this._beginDate, 'yyyy-MM-dd') || '';
  }

  set beginDate(dateString: string) {
    this._beginDate = new Date(dateString);
  }

  get endDate(): string {
    return this.datePipe.transform(this._endDate, 'yyyy-MM-dd') || '';
  }

  set endDate(dateString: string) {
    this._endDate = new Date(dateString);
  }

  // Load all day types from the backend
  loadDayTypes(): void {
    this.calendarService.getTagesarten().subscribe({
      next: (daytypes) => {
        this.daytypes = daytypes;
      },
      error: (err) => {
        console.error('Error fetching day types:', err);
        // Optionally, show an error notification to the user
      }
    });
  }

  // Handle selection from ngx-datatable
  onSelected({ selected }: { selected: Tagesart[] }): void {
    this.selectedDayType = selected.length ? selected[0] : undefined;
    console.log('Selected DayType:', this.selectedDayType);
  }

  // Open the modal for creating or editing a day type
  openModal(content: any, dayType?: Tagesart): void {
    this.selectedDayType = dayType
      ? { ...dayType } // Clone the object for editing
      : new Tagesart() // Default values for new objects

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  // Save the day type (create or update)
  saveTagesart(): void {
    if (this.selectedDayType) {
      console.log(this.selectedDayType.tagesart_nr)
      const isNew = this.selectedDayType.tagesart_nr == null;

      if (isNew) {
        this.calendarService.createTagesart(this.selectedDayType).subscribe({
          next: (createdDayType) => {
            // TODO: Refresh list
            this.modalService.dismissAll(); // Close the modal
            this.selectedDayType = undefined; // Clear selection
          },
          error: (err) => {
            console.error('Error creating day type:', err);
            // Optionally, show an error notification
          }
        });
      } else {
        this.calendarService.updateTagesart(this.selectedDayType).subscribe({
          next: (updatedDayType) => {
            const index = this.daytypes.findIndex(dt => dt.tagesart_nr === updatedDayType.tagesart_nr);
            if (index !== -1) {
              this.daytypes[index] = updatedDayType; // Update the list
            }
            this.modalService.dismissAll(); // Close the modal
            this.selectedDayType = undefined; // Clear selection
          },
          error: (err) => {
            console.error('Error updating day type:', err);
            // Optionally, show an error notification
          }
        });
      }
    }
  }

  // Delete the selected day type
  deleteDaytype(): void {
    if (this.selectedDayType) {
      this.calendarService.deleteTagesart(this.selectedDayType).subscribe({
        next: () => {
          // TODO: refresh list
          this.selectedDayType = undefined; // Clear selection
        },
        error: (err) => {
          console.error('Error deleting day type:', err);
          // Optionally, show an error notification
        }
      });
    }
  }
}
