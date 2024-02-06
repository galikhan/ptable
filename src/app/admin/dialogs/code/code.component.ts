import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Content } from 'src/app/interface/content';
import { BrythonStateService } from 'src/app/service/brython.service';
import { ContentService } from 'src/app/service/content.service';
import * as ace from 'ace-builds';
import { DiCodeData } from '../../constants/di-code-data';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {
  content!: Content;

  constructor(
    public brython: BrythonStateService,
    public contentService: ContentService,
    @Inject(MAT_DIALOG_DATA) public data: DiCodeData,
    public dialogRef: MatDialogRef<CodeComponent>,
  ) {
  }

  ngOnInit(): void {
    if (this.data?.content) {
      this.content = {
        type: 'task',
        body: this.data.content.body,
        topic: this.data.topic,
        id: this.data.content.id,
        isRemoved: this.data.content.isRemoved,
        input: this.data.content.input,
        editorLen: this.data.content.editorLen
      };
    } else {
      this.content = {id: -1, type: 'task', body: '', topic: this.data.topic, input: '', editorLen: 5};
    }
  }

  saveCode() {
    if (this.content && this.content.id > 0) {
      this.contentService.update(this.content).subscribe(result => {
        this.content = result;
      });
    } else {
      this.contentService.create(this.content).subscribe(result => {
        this.content = result;
      });
    }

  }

  saveCodeAndExit() {
    if (this.content && this.content.id > 0) {
      this.contentService.update(this.content).subscribe(result => {
        this.content = result;
        this.dialogRef.close('updated')
      });
    } else {
      this.contentService.create(this.content).subscribe(result => {
        this.content = result;
        this.dialogRef.close('created')
      });
    }

  }


}
