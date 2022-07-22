import {Component, Input, OnInit} from '@angular/core';
import {FormValue} from "../../models/form-value.model";

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss']
})
export class DisclaimerComponent implements OnInit {

  @Input()
  formValue: FormValue | undefined;
  tags: string[] = [
    'Securities', 'Securities + Deposits and Savings', 'Securities + Deposits and Savings + Current'
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
