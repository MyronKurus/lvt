import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {ERoutes} from "../../core/enums/routes";

import {SharedModule} from "../../shared/shared.module";

import {ContentComponent} from "./content.component";

export const routes: Routes = [
  {path: ERoutes.EMPTY, component: ContentComponent}
];

@NgModule({
  declarations: [
    ContentComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class ContentModule {
}
