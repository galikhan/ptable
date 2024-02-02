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
import { ContentComponent } from './dialogs/content/content.component';
import { CodeComponent } from './dialogs/code/code.component';
import { InformaticsModule } from '../informatics/informatics.module';
import {DeleteConfirmationComponent} from './dialogs/delete-confirmation/delete-confirmation.component';
import {SharedModule} from "../shared/shared.module";
import {BrythonEditorComponent} from "../informatics/views/brython-editor/brython-editor.component";
import {MatTooltipModule} from '@angular/material/tooltip';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "../helper/auth.interceptor";
import {MatSelectModule} from "@angular/material/select";
@NgModule({
	declarations: [
		AdminComponent,
		TopicComponent,
		ContentComponent,
    CodeComponent,
    DeleteConfirmationComponent,
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
		MatCheckboxModule,
    SharedModule,
    MatTooltipModule,
    MatSelectModule
	],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ]
})
export class AdminModule { }
