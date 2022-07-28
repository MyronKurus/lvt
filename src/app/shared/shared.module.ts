import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OverlayModule} from '@angular/cdk/overlay';
import {FullscreenOverlayContainer, OverlayContainer} from "@angular/cdk/overlay";

import {ChartModule} from "primeng/chart";
import {MaterialModule} from "./material/material.module";

import {ChartComponent} from './components/chart/chart.component';
import {LoaderComponent} from './components/loader/loader.component';
import {SummaryLineComponent} from './components/summary-line/summary-line.component';
import {IndexSelectionComponent} from "./components/index-selection/index-selection.component";
import {RangeSelectionComponent} from './components/range-selection/range-selection.component';
import {SelectionFiltersComponent} from "./components/selection-filters/selection-filters.component";
import {DisclaimerComponent} from './components/disclaimer/disclaimer.component';
import {DisclaimersModalComponent} from './components/disclaimers-modal/disclaimers-modal.component';

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
  ChartModule,
  OverlayModule,
];

const COMPONENTS = [
  SelectionFiltersComponent,
  ChartComponent,
  IndexSelectionComponent,
  SummaryLineComponent,
  RangeSelectionComponent,
  LoaderComponent,
  DisclaimerComponent,
  DisclaimersModalComponent,
];


@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    ...MODULES,
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS,
  ],
  providers: [
    DatePipe,
    {
      provide: OverlayContainer,
      useClass: FullscreenOverlayContainer,
    }
  ]
})
export class SharedModule {
}
