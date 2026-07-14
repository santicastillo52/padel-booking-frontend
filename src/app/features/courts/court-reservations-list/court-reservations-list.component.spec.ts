import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtReservationsListComponent } from './court-reservations-list.component';

describe('CourtReservationsListComponent', () => {
  let component: CourtReservationsListComponent;
  let fixture: ComponentFixture<CourtReservationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtReservationsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtReservationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
