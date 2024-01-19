import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformaticsRoutingModule } from './informatics-routing.module';
import { InformaticsComponent } from './informatics.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BrythonEditorComponent } from './views/brython-editor/brython-editor.component';


@NgModule({
	declarations: [
		InformaticsComponent,
  		BrythonEditorComponent
	],
	imports: [
		CommonModule,
		InformaticsRoutingModule,
		MatToolbarModule,
		MatCardModule,
		MatTreeModule,
		MatIconModule,
		MatCheckboxModule,
		MatGridListModule,
		MatFormFieldModule,
		FormsModule,
		MatButtonModule
	]
})
export class InformaticsModule { }
