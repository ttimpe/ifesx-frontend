import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { Announcement } from 'src/app/models/announcement.model';
import { StopInformation } from 'src/app/models/stop-information.model';
import { Stop } from 'src/app/models/stop.model';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { StopSearchFieldComponent } from '../stop-search-field/stop-search-field.component';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TitlebarComponent } from '../titlebar/titlebar.component';

@Component({
  selector: 'app-announcement-detail',
  templateUrl: './announcement-detail.component.html',
  styleUrls: ['./announcement-detail.component.css'],
  standalone: true,
  imports: [CommonModule, NgxDatatableModule, StopSearchFieldComponent, FormsModule, TitlebarComponent]
})
export class AnnouncementDetailComponent {
  announcement: Announcement = new Announcement()
  fileNames: string[] = []

  selectionType: SelectionType = SelectionType.single
  selectedStops: StopInformation[] = []



  constructor(    private route: ActivatedRoute,
    private announcementService: AnnouncementService) {}
  ngAfterViewInit(): void {
    this.loadAnnouncement()
    this.loadFiles()

  }

  async loadFiles() {
    this.announcementService.getAllAnnouncementFiles().subscribe(files => {
      this.fileNames = files;
    });
  }
  private loadAnnouncement(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.announcementService.getAnnouncementById(Number(id)).subscribe(
        (announcement) => {
          this.announcement = announcement;

        },
        (error) => {
          console.error('Error fetching announcement:', error);
        }
      );
    }
  }
  saveAnnouncement() {
    console.log('saving')


    if (this.announcement.id) {

      // Update existing line
      this.announcementService.updateAnnouncement(this.announcement ).subscribe(
        (updatedAnnouncement: Announcement) => {
          console.log('Announcement updated:', updatedAnnouncement);
        },
        (error: any) => {
          console.error('Error updating announcement:', error);
        }
      );
    } else {
      this.announcementService.createAnnouncement(this.announcement).subscribe((createdAnnouncement: Announcement) => {
        console.log('announcement created', createdAnnouncement)
      }, (error: any) => {
        console.log('error creating announcement', error)
      })
    }
  }
  onSelect({ selected }: any) {

  }
  selectStop(stop: Stop) {
    console.log(this.announcement)
    this.announcement.stops.push(stop)
    this.announcement.stops = [...this.announcement.stops]
  }
}
