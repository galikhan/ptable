import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Content } from 'src/app/interface/content';
import { BrythonStateService } from 'src/app/service/brython.service';
import { ContentService } from 'src/app/service/content.service';

export interface DiCodeData {
  topic: number;
}

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit, AfterViewInit {

  @ViewChild("textareaEditor") public te!: ElementRef<HTMLElement>;
  content!:Content;

  constructor(
    public brython: BrythonStateService,
    public contentService: ContentService,
    @Inject(MAT_DIALOG_DATA) public data: DiCodeData
  ) { }

  ngOnInit(): void {
    if(this.data) {
      this.content = { type: 'task', body: '', topic : this.data.topic };
    }
  }

  ngAfterViewInit(): void {
    if (this.te) {
      this.te.nativeElement.setAttribute('value', 'print(1)');
    }
  }

  runCode(outputHtmlId: number): void {
    this.brython.setNext(outputHtmlId);
  }

  saveCode() {
    console.log('this.content', this.content);
    
    if(this.content && this.content.id) {
      this.contentService.update(this.content).subscribe(result => {
        console.log('jpdated');
      });
    } else {
      
      this.contentService.create(this.content).subscribe(result => {
        this.content = result;
        console.log('created');
        
      });
    }
   }

}
