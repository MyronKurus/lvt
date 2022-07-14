import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  @Input()
  selectedRange: string | undefined;
  @Input()
  dateSelected: {startDate: string, endDate: string} | undefined;
  @Output()
  closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  range: EventEmitter<{startDate: string, endDate: string}> = new EventEmitter<{startDate: string, endDate: string}>();

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
      startDate: [
        this.selectedRange === 'custom' ? this.dateSelected?.startDate : null,
        {
          validators: [
            Validators.required,
          ]
        }
      ],
      endDate: [
        this.selectedRange === 'custom' ? this.dateSelected?.endDate : null,
        {
          validators: [
            Validators.required,
          ]
        }
      ],
    });
  }

  save() {
    this.range.emit(this.form.getRawValue());
    this.close();
  }

  close() {
    this.closed.emit(true);
  }

}
