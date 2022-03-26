import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { LoginGuardGuard } from '../service/Guard/login-guard.guard';




const routes: Routes = [{
    path: '',
    component: PagesComponent,
    canActivate: [  LoginGuardGuard ],
    /* canLoad: [ LoginGuardGuard ], */
    loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
