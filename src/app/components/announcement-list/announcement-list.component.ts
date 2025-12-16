import { faPenSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
// destination-list.component.ts
import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../services/announcement.service';
import { Announcement } from '../../models/announcement.model';
import { NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TitlebarComponent } from '../titlebar/titlebar.component';

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.css'],
  standalone: true,
  imports: [CommonModule, NgxDatatableModule, FontAwesomeModule, TitlebarComponent]
})
export class AnnouncementListComponent {
  announcements: Announcement[] = [];
  selectionType: SelectionType = SelectionType.single
  selectedRow: Announcement[] = []
  faTrash = faTrash
  faPlus = faPlus
  faPenSquare = faPenSquare
  constructor(private announcementService: AnnouncementService, private router: Router) {}

  ngOnInit(): void {
    this.loadAnnouncements();
  }
  onSelected({ selected }: any) {
    // 'selected' array contains the selected rows
    this.selectedRow = selected;
  }
  private loadAnnouncements(): void {
    this.announcementService.getAllAnnouncements().subscribe(
      (announcements) => {
        this.announcements = announcements;
      },
      (error) => {
        console.error('Error fetching announcements:', error);
      }
    );
  }
  addAnnouncement() {
    this.router.navigate(['/announcements/add'])

  }
  editAnnouncement() {
    this.router.navigate(['/announcements/' + this.selectedRow[0].id])
  }
  deleteAnnouncement() {
    this.announcementService.deleteAnnouncement(this.selectedRow[0]).subscribe((announment) => {
      this.loadAnnouncements()
    }, (error) => {
      console.log('Could not delete announcement')
    })
  }
}
