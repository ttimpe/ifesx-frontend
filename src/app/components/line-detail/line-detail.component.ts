import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LineService } from '../../services/line.service';
import { RecLid } from '../../models/line.model';

import { Route } from '../../models/route.model';
import { RouteService } from '../../services/route.service';
import { CommonModule } from '@angular/common'; // PrimeNG
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { Select } from 'primeng/select';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-line-detail',
  templateUrl: './line-detail.component.html',
  styleUrls: ['./line-detail.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    Button,
    InputText,
    TableModule,
    DialogModule,
    CardModule,
    ColorPickerModule,
    ToastModule
  ]
})
export class LineDetailComponent implements OnInit {
  line?: RecLid
  variants: RecLid[] = []

  constructor(
    private route: ActivatedRoute,
    private lineService: LineService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const lineId = params['lineId'];

      // Check if creating a new line
      if (lineId === 'new') {
        this.line = {
          LI_NR: 0,
          STR_LID: '',
          LI_KUERZEL: '',
          LIDNAME: '',
          BASIS_VERSION: 1
        } as RecLid;
        this.variants = [];
        return;
      }

      this.lineService.getLineById(+lineId).subscribe(line => {
        this.line = line;

      });
      // VDV Variants
      this.lineService.getLineVariants(+lineId).subscribe(vars => {
        this.variants = vars;
      });
    });
  }

  ngAfterViewInit() {
  }

  saveLine(): void {
    if (this.line) {
      this.lineService.updateLine(this.line).subscribe(
        (updatedLine: RecLid) => {
          console.log('Line updated:', updatedLine);
        },
        (error: any) => {
          console.error('Error updating line:', error);
        }
      );
    }
  }

  editVariant(variant: RecLid): void {
    this.router.navigate(['/lines', this.line?.LI_NR, 'variants', variant.STR_LI_VAR]);
  }

  addVariant(): void {
    this.router.navigate(['/lines', this.line?.LI_NR, 'variants', 'new']);
  }

  deleteVariant(variant: RecLid): void { // Fixed type
    if (!confirm('Variante wirklich löschen?')) return;
    this.lineService.deleteVariant(variant.LI_NR, variant.STR_LI_VAR).subscribe(() => {
      this.variants = this.variants.filter(v => v.STR_LI_VAR !== variant.STR_LI_VAR);
    });
  }
}
