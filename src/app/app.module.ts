import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

import {HttpLoaderFactory} from "./core/helpers/http-loader-factory";
import {DATE_FORMATS} from "./core/helpers/datepicker-formatter";

import {AppRoutingModule} from "./app-routing.module";
import {DialogModule} from "./shared/dialogs/dialog.module";

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    DialogModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      },
      useDefaultLang: false
    }),
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
