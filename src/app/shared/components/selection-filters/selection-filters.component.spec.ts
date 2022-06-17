import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionFiltersComponent } from './selection-filters.component';

describe('SelectionFiltersComponent', () => {
  let component: SelectionFiltersComponent;
  let fixture: ComponentFixture<SelectionFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
