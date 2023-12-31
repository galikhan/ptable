import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-id-element',
  templateUrl: './id-element.component.html',
  styleUrls: ['./id-element.component.scss']
})
export class IdElementComponent implements OnInit{

  @Input() items: number[] = [];
  type: string = 'row';

  ngOnInit(): void {
    this.type = this.items.length > 10 ? 'row':'column';
  }


}
