import {NgModule} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MomentDateAdapter, MomentDateModule} from "@angular/material-moment-adapter";
import {DATE_FORMATS} from "../../core/helpers/datepicker-formatter";

const MaterialModules = [
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
  MatButtonModule,
  MomentDateModule,
  MatDatepickerModule,
  MatNativeDateModule,
]

@NgModule({
  imports: [
    MaterialModules
  ],
  exports: [
    MaterialModules
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  ]
})
export class MaterialModule {
}
