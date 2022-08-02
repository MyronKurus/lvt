import {Component, Input, OnInit} from '@angular/core';
import {FormValue} from "../../models/form-value.model";
import {MatDialog} from "@angular/material/dialog";
import {DisclaimersModalComponent} from "../disclaimers-modal/disclaimers-modal.component";

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss']
})
export class DisclaimerComponent implements OnInit {

  @Input()
  formValue: FormValue | undefined;
  isOpen: boolean = false;
  tags: string[] = [
    'Securities', 'Securities + Deposits and Savings', 'Securities + Deposits and Savings + Current'
  ];

  isCollapsed: boolean = true;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DisclaimersModalComponent);
  }

}
