import {Component, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import {FormValue} from "../../models/form-value.model";
import {DisclaimersModalComponent} from "../disclaimers-modal/disclaimers-modal.component";

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss']
})
export class DisclaimerComponent {

  @Input()
  formValue: FormValue | undefined;
  isOpen: boolean = false;
  tags: string[] = [
    'Securities', 'Securities + Deposits and Savings', 'Securities + Deposits and Savings + Current'
  ];

  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(DisclaimersModalComponent, {
      backdropClass: 'transparent',
      maxWidth: '96vw',
      maxHeight: '96vh'
    });
  }

}
