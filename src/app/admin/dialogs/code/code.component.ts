import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Content } from 'src/app/interface/content';
import { BrythonStateService } from 'src/app/service/brython.service';
import { ContentService } from 'src/app/service/content.service';
import { DiCodeData } from "../../constants/interface";
import * as ace from 'ace-builds';


@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit, AfterViewInit {

  @ViewChild("textareaEditor") public te!: ElementRef<HTMLElement>;
  content!: Content;

  constructor(
    public brython: BrythonStateService,
    public contentService: ContentService,
    @Inject(MAT_DIALOG_DATA) public data: DiCodeData,
    public dialogRef: MatDialogRef<CodeComponent>,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.content = {id:-1, type: 'task', body: '', topic: this.data.topic };
    }
  }

  ngAfterViewInit(): void {
    // if (this.content) {
    //   this.content.body = 'print(1)';
    //   let aceEditor = ace.edit(this.te.nativeElement);
    //   ace.config.set("fontSize", "14px");
    //   if (aceEditor) {
    //     aceEditor.session.setValue(this.content.body);
    //     aceEditor.renderer.setShowGutter(false);
    //     const content = this.content;
    //     aceEditor.getSession().on('change', function () {
    //       const aceValue = aceEditor.getSession().getValue();
    //       content.body = aceValue;
    //     });

    //   }

    // }
  }

  runCode(outputHtmlId: number): void {
    this.brython.setNext(outputHtmlId);
  }

  saveCode() {

    if (this.content && this.content.id > 0) {
      this.contentService.update(this.content).subscribe(result => {
        // console.log('updated');
        this.content = result;
        this.dialogRef.close('updated')
      });
    } else {
      this.contentService.create(this.content).subscribe(result => {
        this.content = result;
        // console.log('created');
        this.dialogRef.close('created')
      });
    }

  }

}
