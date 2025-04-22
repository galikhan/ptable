import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChemicalElement } from 'src/app/interface/chemical-element';
import { ShowElementService } from 'src/app/service/show-element.service';

export interface DiData {
  color:string;
  borderColor:string;
  number:number;
  symbol:string;
  atomic_mass:number;

}

@Component({
  selector: 'app-di-popup-element',
  templateUrl: './di-popup-element.component.html',
  styleUrls: ['./di-popup-element.component.scss']
})
export class DiPopupElementComponent implements OnInit{


  color = '';
  borderColor='';
  number = 0;
  symbol = '';
  atomic_mass=0;

  constructor(
    public elementService: ShowElementService,
    @Inject(MAT_DIALOG_DATA) public data: DiData,
    ) {
  }

  ngOnInit(): void {
    if(this.data) {
      this.color = this.data.color;
      this.borderColor = this.data.borderColor;
      this.number = this.data.number;
      this.symbol = this.data.symbol;
      this.atomic_mass = this.data.atomic_mass;
    }
  }
}
