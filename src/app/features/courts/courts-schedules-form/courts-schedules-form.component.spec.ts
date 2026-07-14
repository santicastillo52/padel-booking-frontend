import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtsSchedulesFormComponent } from './courts-schedules-form.component';

describe('CourtsSchedulesFormComponent', () => {
  let component: CourtsSchedulesFormComponent;
  let fixture: ComponentFixture<CourtsSchedulesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtsSchedulesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtsSchedulesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
