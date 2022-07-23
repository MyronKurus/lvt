import {LOCALE_ID, NgModule} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeHe from '@angular/common/locales/he'
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

import {HttpLoaderFactory} from "./core/helpers/http-loader-factory";

import {AppRoutingModule} from "./app-routing.module";

import {AppComponent} from './app.component';
import {AuthInterceptorService} from "./shared/interceptors/auth-interceptor.service";
import {BankProfileInterceptorService} from "./shared/interceptors/bank-profile-interceptor.service";

registerLocaleData(localeHe);

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
      useDefaultLang: true
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BankProfileInterceptorService,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'he-IL'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
