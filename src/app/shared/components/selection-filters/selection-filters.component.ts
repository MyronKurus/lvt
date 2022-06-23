import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import * as moment from 'moment';
import {FormValue} from "../../models/form-value.model";
import {Subscription} from "rxjs";

interface Currency {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-selection-filters',
  templateUrl: './selection-filters.component.html',
  styleUrls: ['./selection-filters.component.scss']
})
export class SelectionFiltersComponent implements OnInit, OnDestroy {

  currencies: Currency[] = [
    {value: 'usd', viewValue: '$'},
    {value: 'eur', viewValue: '€'},
    {value: 'ils', viewValue: '₪'},
  ];
  assets: string[] = ['Securities', 'Deposits and Savings', 'Current'];
  selectedRange: string = '12 month';
  isDialogClosed: boolean = true;

  form = this.formBuilder.group({
    currency: ['ils'],
    assets: [['Securities']],
    startDate:  moment().startOf('day').subtract(1, 'year').add(1, 'day').format(),
    endDate: moment().startOf('day').format()
  });

  private subscription: Subscription | undefined;

  @Output()
  formValue: EventEmitter<FormValue> = new EventEmitter<FormValue>();

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formValue.emit(this.form.getRawValue());
    this.subscription = this.form.valueChanges?.subscribe(value => {
      this.formValue.emit(value);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onMultiselectClick(value: string[]) {
    // console.log(value);
  }

  onSelectRange(value: string) {
    if (value !== 'custom') {
      this.selectedRange = value;
    }
    switch (value) {
      case '3 month':
        this.form.controls['startDate'].patchValue(
          moment().startOf('day').subtract(3, 'months').add(1, 'day').format()
        );
        break;
      case '6 month':
        this.form.controls['startDate'].patchValue(
          moment().startOf('day').subtract(6, 'months').add(1, 'day').format()
        );
        break;
      case '12 month':
        this.form.controls['startDate'].patchValue(
          moment().startOf('day').subtract(1, 'year').add(1, 'day').format()
        );
        break;
      case 'startOfTheYear':
        this.form.controls['startDate'].patchValue(moment().startOf('year').format());
        break;
      case  'custom':
        this.openDialog();
        break;
    }
  }

  openDialog() {
    this.isDialogClosed = false;
  }

  onSelectCustomRange(value: {startDate: string, endDate: string}):void {
    this.form.controls['startDate'].patchValue(value.startDate);
    this.form.controls['endDate'].patchValue(value.endDate);
    this.selectedRange = 'custom';
  }

  onClose(closed: boolean): void {
    this.isDialogClosed = closed;
  }

}
