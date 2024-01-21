import { Component, Input, OnInit } from '@angular/core';
import { Content } from 'src/app/interface/content';
import { BrythonStateService } from 'src/app/service/brython.service';

@Component({
  selector: 'app-brython-editor',
  templateUrl: './brython-editor.component.html',
  styleUrls: ['./brython-editor.component.scss']
})
export class BrythonEditorComponent implements OnInit{

  @Input() public content!: Content;

  constructor(public brython: BrythonStateService) {}

  ngOnInit(): void {
    if(this.content) {

    }
  }

  runCode(id: number | undefined): void {
    if(id) {
      this.brython.setNext(id);
    }
  }
}
