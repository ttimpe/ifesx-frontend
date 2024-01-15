// line-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { LineService } from '../services/line.service';
import { Line } from '../models/line.model';
import { SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-line-detail',
  templateUrl: './line-detail.component.html',
  styleUrls: ['./line-detail.component.css'],
})
export class LineDetailComponent implements OnInit {
  line?: Line
  routes: Route[] = []

  selectionType: SelectionType = SelectionType.single
  selectedRow: Route[] = []

  constructor(private route: ActivatedRoute, private lineService: LineService) {}

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.route.params.subscribe(params => {
       const lineId = params['lineId'];

      this.lineService.getLineById(lineId).subscribe(line => {
        this.line = line;

      });
    });
  }


  private loadLine(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.lineService.getLineById(id).subscribe(
        (line: any) => {
          this.line = line;
        },
        (error: any) => {
          console.error('Error fetching line:', error);
        }
      );
    }
  }
  onSelected({ selected }: any) {
    // 'selected' array contains the selected rows
    this.selectedRow = selected;
    // this.router.navigate(['/lines/' + this.selectedRow[0].id])
  }
  saveLine(): void {
    if (this.line) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Update existing line
      this.lineService.updateLine(id, this.line).subscribe(
        (updatedLine: any) => {
          console.log('Line updated:', updatedLine);
        },
        (error: any) => {
          console.error('Error updating line:', error);
        }
      );
    }
  }
}
}
