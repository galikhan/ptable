import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'just-column-or-row-id',
  templateUrl: './just-column-or-row-id.component.html',
  styleUrls: ['./just-column-or-row-id.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class JustColumnOrRowId implements OnInit{

  @Input() items: number[] = [];
  type: string = 'row';

  ngOnInit(): void {
    this.type = this.items.length > 10 ? 'row':'column';
  }


}
