import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

import {HttpLoaderFactory} from "./core/helpers/http-loader-factory";

import {AppRoutingModule} from "./app-routing.module";

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
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
  bootstrap: [AppComponent]
})
export class AppModule {
}
