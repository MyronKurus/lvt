import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import * as moment from 'moment';
import {FormValue} from "../../models/form-value.model";
import {Subscription} from "rxjs";
import {Currency} from "../../models/currency.model";
import {DataService} from "../../services/data.service";
import {getCurrencySymbol} from "@angular/common";


@Component({
  selector: 'app-selection-filters',
  templateUrl: './selection-filters.component.html',
  styleUrls: ['./selection-filters.component.scss']
})
export class SelectionFiltersComponent implements OnInit, OnDestroy {

  public currencies: Currency[] = [];
  public assets: {value: string, label: string} [] = [
    {value: 'Securities', label: 'ניירות ערך'},
    {value: 'Securities + Deposits and Savings', label: 'ניירות ערך + פיקדונות וחסכונות'},
    {value: 'Securities + Deposits and Savings + Current', label: 'ניירות ערך + פיקדונות וחסכונות + עו"ש'}
  ];
  public selectedRange: string = '12 month';
  public isDialogClosed: boolean = true;
  @Output()
  public formValue: EventEmitter<FormValue> = new EventEmitter<FormValue>();
  public form = this.formBuilder.group({
    requestedPeriod: 3,
    currency: ['97', Validators.required],
    assets: ['Securities', Validators.required],
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
    this.data.getCurrencyList().subscribe(currencies => this.currencies = currencies);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onMultiselectClick(value: string) {
    // if (!value?.includes('Securities')) {
    //   this.form.controls['assets'].patchValue([]);
    // }
  }

  onSelectRange(value: string) {
    console.log(value);
    if (value !== 'custom') {
      this.selectedRange = value;
    }
    switch (value) {
      case '3 month':
        this.form.controls['startDate'].patchValue(
          moment().startOf('day').subtract(3, 'months').add(1, 'day').format()
        );
        this.form.controls['requestedPeriod'].patchValue(1);
        this.isDialogClosed = true;
        this.formValue.emit(this.form.getRawValue());
        break;
      case '6 month':
        this.form.controls['startDate'].patchValue(
          moment().startOf('day').subtract(6, 'months').add(1, 'day').format()
        );
        this.form.controls['requestedPeriod'].patchValue(2);
        this.isDialogClosed = true;
        this.formValue.emit(this.form.getRawValue());
        break;
      case '12 month':
        this.form.controls['startDate'].patchValue(
          moment().startOf('day').subtract(1, 'year').add(1, 'day').format()
        );
        this.form.controls['requestedPeriod'].patchValue(3);
        this.isDialogClosed = true;
        this.formValue.emit(this.form.getRawValue());
        break;
      case 'startOfTheYear':
        this.form.controls['startDate'].patchValue(moment().startOf('year').format());
        this.form.controls['requestedPeriod'].patchValue(4);
        this.isDialogClosed = true;
        this.formValue.emit(this.form.getRawValue());
        break;
      case 'custom':
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
    this.form.controls['requestedPeriod'].patchValue(5);
    this.selectedRange = 'custom';
    this.formValue.emit(this.form.getRawValue());
  }

  onClose(closed: boolean): void {
    this.isDialogClosed = closed;
  }

  getSymbol(isoCode: string) {
    return getCurrencySymbol(isoCode, 'narrow');
  }

}
