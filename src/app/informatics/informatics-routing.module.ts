import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformaticsComponent } from './informatics.component';
import {AdminComponent} from "../admin/admin.component";

const routes: Routes = [
	{ path: '', component: InformaticsComponent },
  { path: 'topic/:topicId/subtopic/:subtopicId', component: InformaticsComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class InformaticsRoutingModule { }
