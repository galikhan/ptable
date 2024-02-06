import { AfterViewInit, Component, Input, OnDestroy, OnInit, } from '@angular/core';
import { Content } from 'src/app/interface/content';
import { BrythonStateService } from 'src/app/service/brython.service';
import * as ace from 'ace-builds';
import { ContentTestService } from 'src/app/service/content-test.service';
import { ContentTest } from 'src/app/interface/content-test';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-brython-editor',
  templateUrl: './brython-editor.component.html',
  styleUrls: ['./brython-editor.component.scss']
})
export class BrythonEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public content!: Content;
  @Input() public isEditor = false;

  id!: number;
  defaultId = -777;
  public editorContent!: Content;
  public contentTest!: ContentTest;
  contentTests: ContentTest [] = [];
  aceEditor: any;
  isFullScreen: boolean = false;
  minLines = 6;
  maxLines = 6;
  editorHeight = 240;
  editorHeightPx = this.editorHeight + 'px';
  contentTestInput!: string;
  contentTestOutput!: string;

  constructor(
    public brython: BrythonStateService,
    public contentTestService: ContentTestService,
    public cRef: ChangeDetectorRef
  ) {
  }
  ngOnDestroy(): void {
    this.aceEditor.container.remove();
  }

  ngAfterViewInit(): void {
    if (this.content) {
      const aceEditorElement = document.getElementById('editor' + this.id)
      const hiddenTextarea = document.getElementById('hidden-textarea' + this.id)
      this.minLines = this.calcMinLines(this.content.editorLen);
      this.editorHeightPx = this.calcEditorHeight(this.minLines) + 'px';

      ace.config.set('fontSize', '14px');
      ace.config.set(
        'basePath',
        'assets/js/ace'
      );
      ace.config.set('maxLines', this.minLines);
      ace.config.set('minLines', this.minLines);

      if (aceEditorElement) {
        this.aceEditor = ace.edit(aceEditorElement);
        this.aceEditor.session.setValue(this.content.body);
        this.aceEditor.session.setMode('ace/mode/python');
        this.aceEditor.renderer.setShowGutter(true);

        if (hiddenTextarea) {
          const content = this.content;
          const aceEditorConst = this.aceEditor;
          this.aceEditor.getSession().on('change', function () {
            content.body = aceEditorConst.getSession().getValue();
            content.editorLen = aceEditorConst.getSession().getLength();
          });
        }
      }
    }
  }

  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    if (this.isFullScreen) {
      this.editorHeightPx = '100vh';
      this.aceEditor.setOptions({
        maxLines: 50
      });
    } else {
      this.editorHeightPx = this.calcEditorHeight(this.minLines) + 'px';
      this.aceEditor.setOptions({
        maxLines: this.minLines,
        minLines: this.minLines
      });
    }
  }

  public updateBody(value: string): void {
    this.content.body = value;
  }

  ngOnInit(): void {
    if (this.content) {
      this.editorContent = Object.create(this.content);
      this.id = this.editorContent.id;
      if (this.isEditor) {
        this.id = this.defaultId;
      }
      this.contentTestService.findByContentId(this.content.id).subscribe(result => {
        this.contentTests = result;
      })
    }
  }

  runCode(id: number): void {
    this.id = id;
    // if(this.isEditor) {
    //   this.id = this.defaultId;
    // }
    console.log('this.content.body', this.content.body);
    if (this.content.body) {
      this.brython.setNext({ id, type: 'runCode' });
    }
  }

  runTestCode(id: number): void {
    this.id = id;
    this.cRef.detectChanges();
    this.brython.setNext({ id: this.id, type: 'runTest' });
  }

  calcEditorHeight(minLines: number): number {
    return minLines * 24;
  }

  calcIOHeight(minLines: number): number {
    return (minLines * 24) / 2 - 20;
  }

  calcMinLines(minLines: number): number {
    if (minLines) {
      if (minLines >= 5) {
        return minLines > 10 ? 10 : minLines;
      } else {
        return 5;
      }
    }
    return 10;
  }

  saveContentTest() {
    if(!this.contentTest) {
      this.contentTest = { content: this.content.id, input: '', output: '', isRemoved: false};
    }
    if(this.contentTest.id) {
      this.contentTest.input = this.contentTestInput;
      this.contentTest.output = this.contentTestOutput;
      this.contentTestService.update(this.contentTest).subscribe(result => {

      });
    } else {
      this.contentTest.input = this.contentTestInput;
      this.contentTest.output = this.contentTestOutput;
      this.contentTestService.create(this.contentTest).subscribe(result => {
        this.contentTests.push(result);
      });
    }
  }

  removeContentTest(item: ContentTest): void {
    if(item && item.id) {
      this.contentTestService.remove(item.id).subscribe(result => {
        if(result) {
          item.isRemoved = true;
        } 
      });
    }
  }

  prepareId(contentTestId: number): number {
    if(this.isEditor) {
      return this.defaultId - contentTestId;
    } else {
      return contentTestId;
    }
  }

}