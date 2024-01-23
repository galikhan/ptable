import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrythonEditorComponent} from "../informatics/views/brython-editor/brython-editor.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BrythonEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BrythonEditorComponent
  ]
})
export class SharedModule {
}
