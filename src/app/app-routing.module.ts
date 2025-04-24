import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component';
import {AuthGuard} from "./helper/auth.guard";


const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'periodic-table', loadChildren: () => import('./periodic-table/periodic-table.routes').then(m => m.MAIN_ROUTES) },
	{ path: 'informatics', loadChildren: () => import('./informatics/informatics.module').then(m => m.InformaticsModule) },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {path: '', redirectTo: '/informatics', pathMatch: 'full'}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			useHash: true,
			preloadingStrategy: PreloadAllModules,
		})
	],
	exports: [RouterModule]
})

export class AppRoutingModule { }
