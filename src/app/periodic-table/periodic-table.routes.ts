import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElementInfoComponent } from '../chemistry/element-info/element-info.component';
import { PeriodicTableComponent } from './periodic-table.component';
import { ElementInfoMobileWrapperComponent } from './components/element-info-mobile-wrapper/element-info-mobile-wrapper.component';

export const MAIN_ROUTES: Routes = [
  { path: '', component: PeriodicTableComponent },
  { path: 'element-mobile', component: ElementInfoMobileWrapperComponent }
];



// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class PeriodicTableRoutingModule { }
