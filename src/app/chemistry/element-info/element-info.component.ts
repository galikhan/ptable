import { Component, OnInit } from '@angular/core';
import { ChemicalElement } from 'src/app/interface/chemical-element';
import { ShowElementService } from 'src/app/service/show-element.service';
import * as json from '../../../assets/ElementsAdditionalInfo.json';

@Component({
  selector: 'app-element-info',
  templateUrl: './element-info.component.html',
  styleUrls: ['./element-info.component.scss']
})
export class ElementInfoComponent implements OnInit {

  element: ChemicalElement | undefined;
  addInfo: any;
  importedJson: any;

  constructor(public elementService: ShowElementService) {
    console.log('constructor');
    
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.importedJson = json;
    const be = this.importedJson["1"];
    console.log(be);
    this.addInfo = be;
    

    this.elementService.element.subscribe(result => {
      console.log('result', result);
      if(result) {
        this.element = result;
        this.addInfo = this.importedJson[result.number];
        console.log('addinfo', this.addInfo);
        
      }
    });
  }
}
