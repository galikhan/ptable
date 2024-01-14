import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core/core.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
	{
		path: 'dashboard',
		component: CoreComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{ path: 'chemistry', loadChildren: () => import('./alchemy/alchemy.module').then(m => m.AlchemyModule) },
	{ path: 'informatics', loadChildren: () => import('./informatics/informatics.module').then(m => m.InformaticsModule) },
	{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
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
