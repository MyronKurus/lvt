import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatNativeDateModule } from "@angular/material/core";
import { MatInputModule } from '@angular/material/input';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";

import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { SelectionFiltersComponent } from './selection-filters/selection-filters.component';
import { TimeRangeDialogComponent } from './time-range-dialog/time-range-dialog.component';
import { HttpLoaderFactory } from "./helpers/http-loader-factory";
import { DATE_FORMATS } from "./helpers/datepicker-formatter";


@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    SelectionFiltersComponent,
    TimeRangeDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatNativeDateModule,
    MatInputModule,
    MomentDateModule,
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
