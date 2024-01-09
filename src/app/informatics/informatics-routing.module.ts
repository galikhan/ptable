import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformaticsComponent } from './informatics.component';

const routes: Routes = [
	{ path: '', component: InformaticsComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class InformaticsRoutingModule { }
