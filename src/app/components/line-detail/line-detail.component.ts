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
import { FormsModule } from '@angular/forms';
import { MengeBereichService } from '../../services/menge-bereich.service';
import { MengeBereich } from '../../models/menge-bereich.model';


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
    InputNumber,
    Select,
    TableModule,
    DialogModule,
    CardModule,
    ToastModule
  ]
})
export class LineDetailComponent implements OnInit {
  line?: RecLid
  variants: RecLid[] = []
  bereichOptions: { value: number, label: string }[] = []

  constructor(
    private route: ActivatedRoute,
    private lineService: LineService,
    private router: Router,
    private bereichService: MengeBereichService
  ) { }

  ngOnInit(): void {
    this.bereichService.getAll().subscribe(bereiche => {
      this.bereichOptions = bereiche.map((b: MengeBereich) => ({
        value: b.BEREICH_NR,
        label: [b.STR_BEREICH, b.BEREICH_TEXT].filter(Boolean).join(' – ') || `Bereich ${b.BEREICH_NR}`
      }));
    });

    this.route.params.subscribe(params => {
      const lineId = params['lineId'];

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
