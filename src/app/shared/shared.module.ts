import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {TranslateModule} from "@ngx-translate/core";

import {ChartModule} from "primeng/chart";
import {MaterialModule} from "./material/material.module";

import {ChartComponent} from './components/chart/chart.component';
import {SelectionFiltersComponent} from "./components/selection-filters/selection-filters.component";
import {IndexSelectionComponent} from "./components/index-selection/index-selection.component";
import {SummaryLineComponent} from './components/summary-line/summary-line.component';
import {RangeSelectionComponent} from './components/range-selection/range-selection.component';

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
  ChartComponent,
  IndexSelectionComponent,
  SummaryLineComponent,
  RangeSelectionComponent,
];


@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS,
  ]
})
export class SharedModule {
}
