import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisclaimersModalComponent } from './disclaimers-modal.component';

describe('DisclaimersModalComponent', () => {
  let component: DisclaimersModalComponent;
  let fixture: ComponentFixture<DisclaimersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisclaimersModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisclaimersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
