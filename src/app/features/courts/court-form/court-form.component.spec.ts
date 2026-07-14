import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtFormComponent } from './court-form.component';

describe('CourtFormComponent', () => {
  let component: CourtFormComponent;
  let fixture: ComponentFixture<CourtFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
