import { Component, OnInit } from '@angular/core';
import { FormValue } from "../../shared/models/form-value.model";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  formValue: FormValue | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  onFormValueChange(value: FormValue) {
    this.formValue = value;
  }

}
