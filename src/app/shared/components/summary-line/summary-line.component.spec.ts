import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryLineComponent } from './summary-line.component';

describe('SummaryLineComponent', () => {
  let component: SummaryLineComponent;
  let fixture: ComponentFixture<SummaryLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
