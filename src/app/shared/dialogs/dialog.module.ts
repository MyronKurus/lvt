import {NgModule} from '@angular/core';

import {SharedModule} from "../shared.module";

import {TimeRangeDialogComponent} from "./time-range-dialog/time-range-dialog.component";

@NgModule({
  declarations: [
    TimeRangeDialogComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    TimeRangeDialogComponent
  ]
})
export class DialogModule {
}
