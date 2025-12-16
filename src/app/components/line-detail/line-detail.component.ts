// line-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineService } from '../../services/line.service';
import { Line } from '../../models/line.model';
import { NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { Route } from '../../models/route.model';
import { RouteService } from '../../services/route.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TitlebarComponent } from '../titlebar/titlebar.component';

@Component({
  selector: 'app-line-detail',
  templateUrl: './line-detail.component.html',
  styleUrls: ['./line-detail.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgxDatatableModule, TitlebarComponent]
})
export class LineDetailComponent implements OnInit {
  line?: Line
  routes: Route[] = []

  selectionType: SelectionType = SelectionType.single
  selectedRoute: Route[] = []

  constructor(
    private route: ActivatedRoute,
    private lineService: LineService,
    private routeService: RouteService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.route.params.subscribe(params => {
       const lineId = params['lineId'];

      this.lineService.getLineById(lineId).subscribe(line => {
        this.line = line;

      });
      this.routeService.getRoutesByLine(lineId).subscribe(routes => {
        this.routes = routes
      })
    });
  }

  onSelected({ selected }: any) {
    // 'selected' array contains the selected rows
    this.selectedRoute = selected;
    // this.router.navigate(['/lines/' + this.selectedRow[0].id])
  }
  saveLine(): void {
    if (this.line) {

      // Update existing line
      this.lineService.updateLine(this.line).subscribe(
        (updatedLine: any) => {
          console.log('Line updated:', updatedLine);
        },
        (error: any) => {
          console.error('Error updating line:', error);
        }
      );
    }
}
  editRoute(): void {
    this.router.navigate(['/lines/' + this.line?.id + '/routes/' + this.selectedRoute[0].number])

  }
  addRoute(): void {
    console.log('add route')
    this.router.navigate(['/lines/' + this.line?.id + '/routes/add'])

  }
  deleteRoute(): void {
    this.routeService.deleteRoute(this.selectedRoute[0]).subscribe(success => {
      console.log('deleted route')
    })
  }


}
