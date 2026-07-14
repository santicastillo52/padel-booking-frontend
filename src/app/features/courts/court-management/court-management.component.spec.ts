import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtManagementComponent } from './court-management.component';

describe('CourtManagementComponent', () => {
  let component: CourtManagementComponent;
  let fixture: ComponentFixture<CourtManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
