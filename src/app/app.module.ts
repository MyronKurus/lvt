import {LOCALE_ID, NgModule} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeHe from '@angular/common/locales/he'
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

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
