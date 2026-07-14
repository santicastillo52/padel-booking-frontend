import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtsSchedulesListComponent } from './courts-schedules-list.component';

describe('CourtsSchedulesListComponent', () => {
  let component: CourtsSchedulesListComponent;
  let fixture: ComponentFixture<CourtsSchedulesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtsSchedulesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtsSchedulesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
