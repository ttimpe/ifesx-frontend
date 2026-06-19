import { Component, OnInit, ViewChild } from '@angular/core';
import { LineService } from '../../services/line.service';
import { RecLid } from '../../models/line.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalendarService } from '../../services/calendar.service';
import { MengeBereichService } from '../../services/menge-bereich.service';
import { MengeBereich } from '../../models/menge-bereich.model';

import { Table, TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { Select } from 'primeng/select';
import { faRoute, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FontAwesomeModule, TableModule,
    Button,
    InputText,
    InputNumber,
    DialogModule,
    Select],
})
export class LineListComponent implements OnInit {
  lines: RecLid[] = [];
  selectedBasisVersion: number | undefined;

  faTrash = faTrash
  faPlus = faPlus
  faRoute = faRoute

  // Create wizard (Linie + erster Fahrweg)
  showCreateDialog = false;
  isSaving = false;
  newLine: RecLid = new RecLid();

  directionOptions = [
    { value: 1, label: '1: Hin' },
    { value: 2, label: '2: Rück' }
  ];

  bereichOptions: { value: number, label: string }[] = [];

  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private lineService: LineService,
    private router: Router,
    private calendarService: CalendarService,
    private bereichService: MengeBereichService
  ) { }

  ngOnInit(): void {
    this.loadBereiche();
    this.calendarService.selectedVersion$.subscribe(version => {
      this.selectedBasisVersion = version || undefined;
      this.loadLines();
    });
  }

  loadBereiche() {
    this.bereichService.getAll().subscribe(bereiche => {
      this.bereichOptions = bereiche.map((b: MengeBereich) => ({
        value: b.BEREICH_NR,
        label: [b.STR_BEREICH, b.BEREICH_TEXT].filter(Boolean).join(' – ') || `Bereich ${b.BEREICH_NR}`
      }));
    });
  }

  loadLines() {
    this.lineService.getLines(this.selectedBasisVersion).subscribe(lines => {
      lines.sort((a: RecLid, b: RecLid) => {
        // Safe parsing or string comparison for LI_KUERZEL
        return (a.LI_KUERZEL || '').localeCompare(b.LI_KUERZEL || '');
      })
      this.lines = lines
    });
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  addLine() {
    this.newLine = new RecLid();
    this.newLine.BASIS_VERSION = this.selectedBasisVersion || 1;
    this.newLine.LI_RI_NR = 1;
    this.showCreateDialog = true;
  }

  createLine() {
    if (this.isSaving) return;
    if (!this.newLine.LI_KUERZEL || !this.newLine.STR_LI_VAR) {
      alert('Liniennummer (LI_KUERZEL) und Fahrweg-Code (STR_LI_VAR) sind erforderlich.');
      return;
    }
    this.isSaving = true;
    this.lineService.createLine(this.newLine).subscribe({
      next: (created) => {
        this.isSaving = false;
        this.showCreateDialog = false;
        // Go straight to the new Fahrweg to add stops
        this.router.navigate(['/lines', created.LI_NR, 'variants', created.STR_LI_VAR]);
      },
      error: (err) => {
        this.isSaving = false;
        console.error('Error creating line:', err);
        alert('Linie konnte nicht angelegt werden.');
      }
    });
  }

  editLine(line: RecLid) {
    this.router.navigate(['/lines/' + line.LI_NR]);
  }

  deleteLine(line: RecLid) {
    // Confirm delete?
    if (!confirm('Linie wirklich löschen?')) return;

    this.lineService.deleteLine(line.LI_NR).subscribe(() => {
      this.lines = this.lines.filter(l => l.LI_NR !== line.LI_NR);
    });
  }
}
