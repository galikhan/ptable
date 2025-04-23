import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformaticsComponent } from '../informatics/informatics.component';
import { AdminComponent } from './admin.component';
import { AdminChemistryComponent } from './components/admin-chemistry/admin-chemistry.component';
import { AdminInformaticsComponent } from './components/admin-informatics/admin-informatics.component';

const routes: Routes = [
	{
		path: '', component: AdminComponent,
		children: [
			{ path: 'informatics', component: AdminInformaticsComponent },
			{ path: 'informatics/topic/:topicId/subtopic/:subtopicId', component: AdminInformaticsComponent },
			{ path: 'chemistry', component: AdminChemistryComponent },
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
