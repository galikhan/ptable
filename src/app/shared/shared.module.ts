import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrythonEditorComponent} from "../informatics/views/brython-editor/brython-editor.component";
import {FormsModule} from "@angular/forms";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [
    BrythonEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatGridListModule,
    MatIconModule
  ],
  exports: [
    BrythonEditorComponent
  ]
})
export class SharedModule {
}
