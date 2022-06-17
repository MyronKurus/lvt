import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Moment} from "moment";
import * as moment from "moment";

@Component({
  selector: 'app-time-range-dialog',
  templateUrl: './time-range-dialog.component.html',
  styleUrls: ['./time-range-dialog.component.scss']
})
export class TimeRangeDialogComponent implements OnInit {

  public form: FormGroup = new FormGroup({});
  minDate: Date = new Date();
  maxDate: Date = new Date();


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TimeRangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
  }

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear - 1, currentMonth, currentDay);
    this.maxDate = new Date();
    this.form = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
