import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {TranslateModule} from "@ngx-translate/core";

import {ChartModule} from "primeng/chart";
import {MaterialModule} from "./material/material.module";

import { ChartComponent } from './components/chart/chart.component';
import {SelectionFiltersComponent} from "./components/selection-filters/selection-filters.component";

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
  TranslateModule,
  ChartModule
];

const COMPONENTS = [
  SelectionFiltersComponent,
  ChartComponent
];


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS
  ]
})
export class SharedModule {
}
