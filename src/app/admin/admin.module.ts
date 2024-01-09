import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TopicComponent } from './dialogs/topic/topic.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTreeModule } from '@angular/material/tree';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
	declarations: [
		AdminComponent,
		TopicComponent
	],
	imports: [
		CommonModule,
		AdminRoutingModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatExpansionModule,
		ReactiveFormsModule,
		MatCardModule,
		MatTreeModule,
		FormsModule,
		MatCheckboxModule
	]
})
export class AdminModule { }