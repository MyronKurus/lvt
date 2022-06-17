import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

import {HttpLoaderFactory} from "../core/helpers/http-loader-factory";

import {MaterialModule} from "./material/material.module";

import {SelectionFiltersComponent} from "./components/selection-filters/selection-filters.component";


@NgModule({
  declarations: [
    SelectionFiltersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    SelectionFiltersComponent
  ]
})
export class SharedModule {
}
