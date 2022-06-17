import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppComponent} from './app.component';
import {ContentComponent} from './content/content.component';
import {DATE_FORMATS} from "./core/helpers/datepicker-formatter";
import {SharedModule} from "./shared/shared.module";
import {DialogModule} from "./shared/dialogs/dialog.module";


@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    DialogModule,
  ],
  exports: [
    SharedModule
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: DATE_FORMATS
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
