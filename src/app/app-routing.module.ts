import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core/core.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: CoreComponent
  },
  { path: 'chemistry', loadChildren: () => import('./alchemy/alchemy.module').then(m => m.AlchemyModule) }
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
