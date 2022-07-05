import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import * as moment from 'moment';
import {FormValue} from "../../models/form-value.model";
import {forkJoin, Subscription} from "rxjs";
import {Currency} from "../../models/currency.model";
import {DataService} from "../../services/data.service";


@Component({
  selector: 'app-selection-filters',
  templateUrl: './selection-filters.component.html',
  styleUrls: ['./selection-filters.component.scss']
})
export class SelectionFiltersComponent implements OnInit, OnDestroy {

  public currencies: Currency[] = [];
  public assets: {value: string, label: string}[] = [
    {value: 'Securities', label: 'ניירות ערך'},
    {value: 'Deposits and Savings', label: 'פיקדונות וחסכונות'},
    {value: 'Current', label: 'עו"ש'}
  ];
  public selectedRange: string = '12 month';
  public isDialogClosed: boolean = true;
  @Output()
  public formValue: EventEmitter<FormValue> = new EventEmitter<FormValue>();
  public form = this.formBuilder.group({
    currency: ['ILS', Validators.required],
    assets: [['Securities'], Validators.required],
    startDate: moment().startOf('day').subtract(1, 'year').add(1, 'day').format(),
    endDate: moment().startOf('day').format()
  });
  private subscription: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private data: DataService,
  ) { }

  ngOnInit(): void {
    this.formValue.emit(this.form.getRawValue());
    this.subscription = this.form.valueChanges?.subscribe(value => {
      this.formValue.emit(value);
    });
    this.data.getCurrencyList()
      .subscribe(currencies => this.currencies = currencies);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onMultiselectClick(value: string[]) {
    if (!value?.includes('Securities')) {
      this.form.controls['assets'].patchValue([]);
    }
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
