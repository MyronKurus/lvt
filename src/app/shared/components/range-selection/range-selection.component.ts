import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {dateValidator} from "../../../core/helpers/date.validator";

@Component({
  selector: 'app-range-selection',
  templateUrl: './range-selection.component.html',
  styleUrls: ['./range-selection.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RangeSelectionComponent implements OnInit {

  public form: FormGroup = new FormGroup({});
  minDate: Date | undefined;
  maxDate: Date | undefined;
  @Output()
  closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  selectedRange: EventEmitter<{startDate: string, endDate: string}> = new EventEmitter<{startDate: string, endDate: string}>();

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear - 3, currentMonth, currentDay);
    this.maxDate = new Date();
    this.form = this.fb.group({
      startDate: [null, {
        validators: [
          Validators.required,
          // dateValidator()
        ]
      }],
      endDate: [null, {
        validators: [
          Validators.required,
          // dateValidator()
        ]
      }],
    });
  }

  save() {
    this.selectedRange.emit(this.form.getRawValue());
    this.close();
  }

  close() {
    this.closed.emit(true);
  }

}
