// line-list.component.ts

import { Component, OnInit } from '@angular/core';
import { LineService } from '../services/line.service';

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.css']
})
export class LineListComponent implements OnInit {
  lines: any[] = [];

  constructor(private lineService: LineService) { }

  ngOnInit(): void {
    this.lineService.getLines().subscribe(lines => {
      this.lines = lines;
    });
  }
}
