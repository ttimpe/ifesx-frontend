// route-list.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RouteService } from '../../services/route.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class RouteListComponent implements OnInit {
  lineId: string = ''
  routes: any[] = []

  constructor(private route: ActivatedRoute, private routeService: RouteService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.lineId = params['lineId'];

      this.routeService.getRoutesByLine(this.lineId).subscribe(routes => {
        this.routes = routes;
      });
    });
  }
}
