import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { CommonModule, Location } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule]
})
export class TitlebarComponent {
  faChevronLeft = faChevronLeft
  @Input() title: string = ''
  @Input() canGoBack: boolean = false
  constructor(private location: Location) {}


  onBackButton() {
    this.location.back()
  }
}
