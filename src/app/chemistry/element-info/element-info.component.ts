import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChemicalElement } from 'src/app/interface/chemical-element';
import { ShowElementService } from 'src/app/service/show-element.service';
import * as json from '../../../assets/ElementsAdditionalInfo.json';

export interface DiData {
  element:ChemicalElement | undefined;
}
@Component({
  selector: 'app-element-info',
  templateUrl: './element-info.component.html',
  styleUrls: ['./element-info.component.scss']
})
export class ElementInfoComponent implements OnInit {

  element: ChemicalElement | undefined;
  addInfo: any;
  importedJson: any;

  constructor(
    public elementService: ShowElementService,
    @Inject(MAT_DIALOG_DATA) public data: DiData) {
    console.log('constructor');
    
  }

  ngOnInit(): void {

    
    if(this.data.element) {
      console.log('this.element?.number', this.data.element?.number);
      this.importedJson = json;
      const be = this.importedJson[this.data.element?.number];
      this.addInfo = be;
    }
    

    // this.elementService.element.subscribe(result => {

    //   if(result) {
    //     this.element = result;
    //     this.addInfo = this.importedJson[result.number];
    //     console.log('addinfo', this.addInfo);
        
    //   }
    // });
  }
}
