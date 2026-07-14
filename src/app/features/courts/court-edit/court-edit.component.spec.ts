import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtEditComponent } from './court-edit.component';

describe('CourtEditComponent', () => {
  let component: CourtEditComponent;
  let fixture: ComponentFixture<CourtEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
