import { Component, Input } from '@angular/core';
import { Tagesart } from 'src/app/models/tagesart.model';

@Component({
  selector: 'app-tagesart-modal',
  templateUrl: './tagesart-modal.component.html',
  styleUrls: ['./tagesart-modal.component.css']
})
export class TagesartModalComponent {
  @Input() tagesart!: Tagesart

  saveTagesart() {
    console.log(this.tagesart)
  }
}
