import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexSelectionComponent } from './index-selection.component';

describe('IndexSelectionComponent', () => {
  let component: IndexSelectionComponent;
  let fixture: ComponentFixture<IndexSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
