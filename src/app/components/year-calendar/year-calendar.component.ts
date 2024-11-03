import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-year-calendar',
  templateUrl: './year-calendar.component.html',
  styleUrls: ['./year-calendar.component.css']
})
export class YearCalendarComponent {
  @Input() beginDate: Date = new Date()
  @Input() endDate: Date = new Date()
  calendar: any[] = [];


  ngOnInit() {
    if (this.beginDate && this.endDate) {
    this.generateCalendar();
    }
  }
  // Rebuild the calendar when inputs change
  ngOnChanges(changes: SimpleChanges) {
    if (changes['beginDate'] || changes['endDate']) {
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
      month.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return { month: formatDate(firstDayOfMonth, 'MMMM yyyy', 'de'), days: month };
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
