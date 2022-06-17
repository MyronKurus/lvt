import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ERoutes} from "./core/enums/routes";


const routes: Routes = [
  {
    path: ERoutes.EMPTY,
    loadChildren: () => import('./modules/content/content.module').then(m => m.ContentModule)
  },
  {
    path: ERoutes.AUTH,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: ERoutes.OTHER,
    redirectTo: ERoutes.EMPTY,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      useHash: true
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
