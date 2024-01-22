import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Content } from 'src/app/interface/content';
import { BrythonStateService } from 'src/app/service/brython.service';
import * as ace from 'ace-builds';

@Component({
  selector: 'app-brython-editor',
  templateUrl: './brython-editor.component.html',
  styleUrls: ['./brython-editor.component.scss']
})
export class BrythonEditorComponent implements OnInit, AfterViewInit {

  @Input() public content!: Content;

  constructor(public brython: BrythonStateService) { }

  // @ViewChild('aceEditor') private aceEditor!: ElementRef<HTMLElement>;
  // @ViewChild('hiddentTextarea') private hiddenTextarea!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    if (this.content) {
      const id = this.content.id;
      const aceEditorElement = document.getElementById('editor' + id)
      const hiddenTextarea = document.getElementById('hidden-textarea' + id)
      ace.config.set("fontSize", "14px");

      if (aceEditorElement) {
        let aceEditor = ace.edit(aceEditorElement);
        aceEditor.session.setValue(this.content.body);
        // aceEditor.session.setMode("ace/mode/python");
        aceEditor.renderer.setShowGutter(false);

        if (hiddenTextarea) {
          // this.setHiddenTextareaValue(this.content.body);
          hiddenTextarea.setAttribute('value', this.content.body);
          const content = this.content;
          aceEditor.getSession().on('change', function () {
            const aceValue = aceEditor.getSession().getValue();
            content.body = aceValue;
            // this.updateBody(aceValue); 
            // console.log('getSession', aceValue, hiddenTextarea);
            // hiddenTextarea.setAttribute('value', aceValue);
          });
        }

      }
    }
  }

  public updateBody(value: string): void {
    this.content.body = value;
  }

  ngOnInit(): void {
    if (this.content) {

    }
  }

  runCode(id: number): void {
    if (this.content.body) {
      console.log(' runCode id', id)
      this.brython.setNext(id);
    }
  }

  editCode(id: number | undefined) {

  }
}
