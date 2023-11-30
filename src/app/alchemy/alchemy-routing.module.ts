import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElementInfoComponent } from '../chemistry/element-info/element-info.component';
import { AlchemyComponent } from './alchemy.component';
import { ElementInfoMobileWrapperComponent } from './components/element-info-mobile-wrapper/element-info-mobile-wrapper.component';

const routes: Routes = [
  { path: '', component: AlchemyComponent },
  { path: 'element-mobile', component: ElementInfoMobileWrapperComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlchemyRoutingModule { }
