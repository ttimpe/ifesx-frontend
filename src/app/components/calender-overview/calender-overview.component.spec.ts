import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderOverviewComponent } from './calender-overview.component';

describe('CalenderOverviewComponent', () => {
  let component: CalenderOverviewComponent;
  let fixture: ComponentFixture<CalenderOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalenderOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalenderOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
