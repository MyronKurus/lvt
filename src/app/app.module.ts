import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {DATE_FORMATS} from "./core/helpers/datepicker-formatter";

import {SharedModule} from "./shared/shared.module";
import {AppRoutingModule} from "./app-routing.module";
import {DialogModule} from "./shared/dialogs/dialog.module";

import {AppComponent} from './app.component';
import {ContentComponent} from './modules/content/content.component';


@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
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
