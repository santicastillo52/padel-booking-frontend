import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtsDetailComponent } from './courts-detail.component';

describe('CourtsDetailComponent', () => {
  let component: CourtsDetailComponent;
  let fixture: ComponentFixture<CourtsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
