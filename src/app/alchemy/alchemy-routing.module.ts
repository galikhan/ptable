import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlchemyComponent } from './alchemy.component';

const routes: Routes = [{ path: '', component: AlchemyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlchemyRoutingModule { }
