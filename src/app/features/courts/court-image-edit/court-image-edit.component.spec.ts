import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtImageEditComponent } from './court-image-edit.component';

describe('CourtImageEditComponent', () => {
  let component: CourtImageEditComponent;
  let fixture: ComponentFixture<CourtImageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtImageEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtImageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
