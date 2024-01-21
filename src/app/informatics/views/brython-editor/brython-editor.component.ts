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

  @ViewChild('aceEditor') private editor!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    ace.config.set("fontSize", "14px");
    console.log('editors', this.editor);

    if (this.editor) {
      let aceEditor = ace.edit(this.editor.nativeElement);
      aceEditor.session.setValue(this.content.body);
      aceEditor.session.setMode("ace/mode/python");
      aceEditor.renderer.setShowGutter(false);
    }

  }

  ngOnInit(): void {
    if (this.content) {

    }
  }

  runCode(id: number | undefined): void {
    if (id) {
      this.brython.setNext(id);
    }
  }
}
