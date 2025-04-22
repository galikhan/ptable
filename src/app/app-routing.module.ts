import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { CoreComponent } from './core/core.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from "./helper/auth.guard";


const routes: Routes = [
	{
		path: 'dashboard',
		component: CoreComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{ path: 'chemistry', loadChildren: () => import('./periodic-table/periodic-table.module').then(m => m.PeriodicTableModule) },
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
			// relativeLinkResolution: 'legacy'
		})
	],
	exports: [RouterModule]
})

export class AppRoutingModule { }
