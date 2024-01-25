import {AfterViewInit, Component, Input, OnDestroy, OnInit,} from '@angular/core';
import {Content} from 'src/app/interface/content';
import {BrythonStateService} from 'src/app/service/brython.service';
import * as ace from 'ace-builds';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-brython-editor',
  templateUrl: './brython-editor.component.html',
  styleUrls: ['./brython-editor.component.scss']
})
export class BrythonEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public content!: Content;
  @Input() public isEditor = false;
  id!: number;
  public editorContent!: Content;
  aceEditor: any;

  constructor(
    public brython: BrythonStateService,
    public dialog: MatDialog,
  ) {
  }
  ngOnDestroy(): void {
    this.aceEditor.container.remove();
  }

  ngAfterViewInit(): void {
    if (this.content) {
      const aceEditorElement = document.getElementById('editor' + this.id)
      const hiddenTextarea = document.getElementById('hidden-textarea' + this.id)
      ace.config.set("fontSize", "14px");
      ace.config.set(
        "basePath",
        "assets/js/ace"
      );

      if (aceEditorElement) {
        this.aceEditor = ace.edit(aceEditorElement);
        this.aceEditor.session.setValue(this.content.body);
        this.aceEditor.session.setMode("ace/mode/python");
        this.aceEditor.renderer.setShowGutter(true);

        if (hiddenTextarea) {
          const content = this.content;
          const aceEditorConst = this.aceEditor;
          this.aceEditor.getSession().on('change', function () {
            content.body = aceEditorConst.getSession().getValue();
          });
        }
      }
    }
  }

  public updateBody(value: string): void {
    this.content.body = value;
  }

  ngOnInit(): void {

    if(this.content) {
      this.editorContent = Object.create(this.content);
      this.id = this.editorContent.id;
      if(this.isEditor) {
        this.id = -777;
      }
    }
  }

  runCode(id: number): void {
    if (this.content.body) {
      // console.log(' runCode id', id)
      this.brython.setNext(id);
    }
  }
}
