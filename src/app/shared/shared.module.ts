import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import { MatTabsModule } from '@angular/material/tabs';
import { BrythonEditorComponent } from './brython-editor/brython-editor.component';

@NgModule({
  declarations: [
    BrythonEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
  ],
  exports: [
    BrythonEditorComponent,
    CommonModule,
    FormsModule,
  ]
})
export class SharedModule {
}
