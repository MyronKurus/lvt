import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import * as moment from 'moment';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { TimeRangeDialogComponent } from "../time-range-dialog/time-range-dialog.component";


interface Currency {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-selection-filters',
  templateUrl: './selection-filters.component.html',
  styleUrls: ['./selection-filters.component.scss']
})
export class SelectionFiltersComponent implements OnInit {

  currencies: Currency[] = [
    {value: 'usd', viewValue: '$'},
    {value: 'eur', viewValue: '€'},
    {value: 'ils', viewValue: '₪'},
  ];
  assets: string[] = ['Securities', 'Deposits and Savings', 'Current'];
  selectedRange: string = '12 month';

  form = this.formBuilder.group({
    currency: ['ils'],
    assets: [['Securities']],
    startDate:  moment().startOf('day').subtract(6, 'months').format(),
    endDate: moment().startOf('day').format()
  })


  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // console.log(this.filtersForm.getRawValue());
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
        this.form.controls['startDate'].patchValue(moment().startOf('day').subtract(3, 'months').format());
        break;
      case '6 month':
        this.form.controls['startDate'].patchValue(moment().startOf('day').subtract(6, 'months').format());
        break;
      case '12 month':
        this.form.controls['startDate'].patchValue(moment().startOf('day').subtract(1, 'year').format());
        break;
      case 'startOfTheYear':
        this.form.controls['startDate'].patchValue(moment().startOf('year').format());
        break;
      case  'custom':
        this.openDialog(value);
        break;
    }
  }

  openDialog(value: string) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top: '180px',
      left: '20px'
    };

    const dialogRef = this.dialog.open(TimeRangeDialogComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(data => {
        if (data) {
          this.form.controls['startDate'].patchValue(data.startDate);
          this.form.controls['endDate'].patchValue(data.endDate);
          this.selectedRange = value;
          console.log(this.form.getRawValue());
        }
      }
    );
  }

}
