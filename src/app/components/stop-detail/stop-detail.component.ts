import { StopInformation } from '../../models/stop-information.model';
import { Component, Input } from '@angular/core';
import { Stop } from '../../models/stop.model';
import { StopService } from '../../services/stop.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TitlebarComponent } from '../titlebar/titlebar.component';

@Component({
  selector: 'app-stop-detail',
  templateUrl: './stop-detail.component.html',
  styleUrls: ['./stop-detail.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TitlebarComponent]
})
export class StopDetailComponent {
  stop?: Stop
  stopInformation: StopInformation = new StopInformation()
  constructor(private route: ActivatedRoute, private stopService: StopService) {

  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
       const stopId = params['stopId'];

      if (stopId != 'add') {
      this.stopService.getStopById(stopId).subscribe(stop => {
        this.stop = stop;
        if (this.stop.information) {
          this.stopInformation = this.stop.information
        }
      });
    }
    else {
      const _stop = new Stop()
      _stop.information = new StopInformation()
      this.stop = _stop
    }
    });
  }
  onSubmit(): void {
    if (this.stop) {
      this.stop.information = this.stopInformation
      this.stopService.updateStop(this.stop)
        .subscribe(updatedStop => this.stop = updatedStop);
    }
  }
}
