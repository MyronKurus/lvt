import {Component, Input, OnInit} from '@angular/core';
import {FormValue} from "../../models/form-value.model";

@Component({
  selector: 'app-summary-line',
  templateUrl: './summary-line.component.html',
  styleUrls: ['./summary-line.component.scss']
})
export class SummaryLineComponent implements OnInit {

  @Input()
  data: FormValue | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}