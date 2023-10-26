import { Component, OnInit } from '@angular/core';
import { ChemicalElement } from 'src/app/interface/chemical-element';
import { ShowElementService } from 'src/app/service/show-element.service';
import * as json from '../../../assets/ElementsAdditionalInfo.json';

@Component({
  selector: 'app-element-info',
  templateUrl: './element-info.component.html',
  styleUrls: ['./element-info.component.css']
})
export class ElementInfoComponent implements OnInit {

  element: ChemicalElement | undefined;
  addInfo: any;

  constructor(public elementService: ShowElementService) {
    console.log('constructor');
    
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    const importedJson = json;
    const be = importedJson["4"];
    console.log(be);
    this.addInfo = be;
    

    this.elementService.element.subscribe(result => {
      console.log('result', result);
      this.element = result;
    });
  }
}
