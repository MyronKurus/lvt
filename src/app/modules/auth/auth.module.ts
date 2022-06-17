import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {ERoutes} from "../../core/enums/routes";

import {SharedModule} from "../../shared/shared.module";

import {AuthComponent} from './auth.component';


export const routes: Routes = [
  {path: ERoutes.EMPTY, component: AuthComponent}
];

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class AuthModule {
}
