import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { Betriebstag } from 'src/app/models/betriebstag.model';

@Component({
  selector: 'app-year-calendar',
  templateUrl: './year-calendar.component.html',
  styleUrls: ['./year-calendar.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class YearCalendarComponent {
  @Input() beginDate: Date = new Date()
  @Input() endDate: Date = new Date()
  @Input() betriebstage: Betriebstag[] = [];


  calendar: any[] = [];


  ngOnInit() {
    if (this.beginDate && this.endDate) {
    this.generateCalendar();
    }
  }
  // Rebuild the calendar when inputs change
  ngOnChanges(changes: SimpleChanges) {
    if (changes['beginDate'] || changes['endDate'] || changes['betriebstage']) {
      this.generateCalendar();
    }
  }
  generateCalendar() {
    this.calendar = []
    const start = new Date(this.beginDate);
    start.setDate(1); // Start at the beginning of the month
    const end = new Date(this.endDate);
    end.setDate(1); // Start at the beginning of the month

    let currentDate = new Date(start);
    while (currentDate <= end) {
      this.calendar.push(this.generateMonth(currentDate));
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  }
  generateMonth(date: Date) {
    const month = [];
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const firstDayOfMonth = new Date(year, monthIndex, 1);
    const lastDayOfMonth = new Date(year, monthIndex + 1, 0);

    let startOfWeek = this.getMonday(new Date(firstDayOfMonth));
    let current = new Date(startOfWeek);

    while (current <= lastDayOfMonth || current.getDay() !== 1) {
      const isCurrentMonth = current.getMonth() === monthIndex;
      const betriebstag = this.findBetriebstag(current);
      const isOutOfRange = current < this.beginDate || current > this.endDate;

      month.push({
        date: new Date(current),
        isCurrentMonth,
        isOutOfRange,
        specialClass: betriebstag ? `special-${betriebstag.tagesart_nr}` : null
      });
      current.setDate(current.getDate() + 1);
    }
    return { month: formatDate(firstDayOfMonth, 'MMMM yyyy', 'de'), days: month };
  }
  findBetriebstag(date: Date): Betriebstag | undefined {
    const formattedDate = this.formatDateToYYYYMMDD(date);
    return this.betriebstage.find(betriebstag => betriebstag.betriebstag === formattedDate);
  }

  formatDateToYYYYMMDD(date: Date): number {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return parseInt(`${year}${month}${day}`, 10);
  }
  getMonday(d: Date) {
    const date = new Date(d);
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day; // Adjust for Sunday
    date.setDate(date.getDate() + diff);
    return date;
  }
  // Find the months to display, loop through them and show each day
}
