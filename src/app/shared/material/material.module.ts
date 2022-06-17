import {NgModule} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MomentDateModule} from "@angular/material-moment-adapter";

const MaterialModules = [
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
  MatButtonModule,
  MomentDateModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatNativeDateModule,
]

@NgModule({
  imports: [
    MaterialModules
  ],
  exports: [
    MaterialModules
  ]
})
export class MaterialModule {
}
