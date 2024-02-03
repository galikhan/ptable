import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrythonEditorComponent} from "../informatics/views/brython-editor/brython-editor.component";
import {FormsModule} from "@angular/forms";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
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
    MatMenuModule
  ],
  exports: [
    BrythonEditorComponent
  ]
})
export class SharedModule {
}
