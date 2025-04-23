import { Component, OnInit } from '@angular/core';
import * as json from '../../assets/PeriodicTableJSON.json'
import { ChemicalElement } from '../interface/chemical-element';
import { BrythonStateService } from '../service/brython.service';
import { HighlightByTemperatureService } from '../service/highlight-by-temperature.service';
import { HighlightStateService } from '../service/highlight-state.service';
import { HighlightTypeService } from '../service/highlight-type.service';
import { ShowElementService } from '../service/show-element.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { ElementComponent } from '../chemistry/common-components/element/element.component';
import { IdElementComponent } from '../chemistry/common-components/id-element/id-element.component';
import { ElementInfoComponent } from '../chemistry/element-info/element-info.component';

@Component({
  selector: 'app-periodic-table',
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.scss'],
  standalone: true,
  imports: [
    ElementInfoComponent,
    IdElementComponent,
    ElementComponent,
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatDialogModule,
    MatIconModule,
    MatSliderModule,
    MatCardModule,
  ]

})
export class PeriodicTableComponent {

    //in kelvin 
    max = 5727;
    min = -273;
    temparature = 0;
  
    title = 'ptable';
    columns = [1,2,3,4,5,6,7];
    rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    
    lefttop_yaxis = [1, 2, 3];
    lefttop_xaxis = [1, 2];
  
    righttop_yaxis = [1, 2, 3];
    righttop_xaxis = [13, 14, 15, 16, 17, 18];
  
    body_yaxis = [4, 5, 6, 7];
    body_xaxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  
    footer_yaxis = [9, 10];
    footer_xaxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  
    elements: ChemicalElement[] = [];
    leftTopArray: Map<number, Map<number, ChemicalElement>> = new Map;
    rightTopArray: Map<number, Map<number, ChemicalElement>> = new Map;
    bodyArray: Map<number, Map<number, ChemicalElement>> = new Map;
    footerArray: Map<number, Map<number, ChemicalElement>> = new Map;
    stateC = false;
    stateHg = false;
    currentState = '';
    currentType = '';
  
    constructor(
      public highlightStateService: HighlightStateService,
      public highlightTypeService: HighlightTypeService,
      public byTemperatureService: HighlightByTemperatureService,
      public elementService: ShowElementService,
      public brython: BrythonStateService
    ) {
  
    }

    ngOnInit(): void {
  
      const importedJson = json;
      this.elements = importedJson.elements
      this.elementService.setNext(this.elements[0]);

      const cts: Set<string> = new Set();
      const arr: any []= [];
      this.elements.forEach(item => {
        cts.add(item.category);
      });
      
  
      const leftTopTemp = this.filterBySymbol(['H', 'Li', 'Be', 'Na', 'Mg']);
      this.leftTopArray = this.convertToMap(leftTopTemp);
  
      const rightTopTemp = this.filterBySymbol(['He', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar',]);
      this.rightTopArray = this.convertToMap(rightTopTemp);
  
      const rangeOfElements_57_71: ChemicalElement = { symbol: '57-71', name: '', xpos: 3, ypos: 6, cpkHex: '00b' };
      const rangeOfElements_89_103: ChemicalElement = { symbol: '89-103', name: '', xpos: 3, ypos: 7, cpkHex: '00b' };
      let bodyTemp = this.filterByNumberRange(19, 56);
      const bodyTempContinue = this.filterByNumberRange(72, 88);
      const bodyTempLatest = this.filterByNumberRange(104, 118);
  
      bodyTemp.push(rangeOfElements_57_71);
      bodyTempContinue.push(rangeOfElements_89_103);
      bodyTemp = bodyTemp.concat(bodyTempContinue).concat(bodyTempLatest);
  
      this.bodyArray = this.convertToMap(bodyTemp);
  
      const line_6: ChemicalElement = { symbol: '6', name: '', xpos: 1, ypos: 9, cpkHex: '00b' };
      const line_7: ChemicalElement = { symbol: '7', name: '', xpos: 1, ypos: 10, cpkHex: '00b' };
  
      let footerTemp = [];
      footerTemp.push(line_6);
      let line6Elements = this.filterByNumberRange(57, 71);
      footerTemp = footerTemp.concat(line6Elements);
      footerTemp.push(line_7);
      let line7Elements = this.filterByNumberRange(89, 103);
      footerTemp = footerTemp.concat(line7Elements);
      this.footerArray = this.convertToMap(footerTemp);
  
  
      this.temperatureUpdated(this.temparature);
    }
  
    filterBySymbol(symbols: string[]): ChemicalElement[] {
      return this.elements.filter(item => symbols.indexOf(item.symbol) != -1);
    }
  
    filterByNumberRange(start: number, end: number): ChemicalElement[] {
      return this.elements.filter(item => item.number >= start && item.number <= end);
    }
  
    convertToMap(leftTopTemp: ChemicalElement[],): Map<number, Map<number, ChemicalElement>> {
      const leftTopArray: Map<number, Map<number, ChemicalElement>> = new Map;
      leftTopTemp.forEach(i => {
        const hasElement = leftTopArray.has(i.ypos);
        if (hasElement) {
          leftTopArray.get(i.ypos)?.set(i.xpos, i);
        } else {
          const innerMap: Map<number, ChemicalElement> = new Map;
          innerMap.set(i.xpos, i);
  
          leftTopArray.set(i.ypos, innerMap);
        }
      });
      return leftTopArray;
    }
  
    updateState(state: string): void {
      this.currentType = '';
      this.highlightTypeService.setNext('removeAllType');
  
      if(state === this.currentState) {
        this.currentState = '';
        this.highlightStateService.setNext('removeAllState');
      } else {
        this.currentState = state;
        this.highlightStateService.setNext('removeAllState');
        this.highlightStateService.setNext(state);
      }
    }
  
    highlightType(type: string): void {
      this.currentState = '';
      this.highlightStateService.setNext('removeAllState');
  
      if(type === this.currentType) {
        this.currentType = '';
        this.highlightTypeService.setNext('removeAllType');
      } else {
        this.currentType = type;
        this.highlightTypeService.setNext('removeAllType');
        this.highlightTypeService.setNext(type);
      }
    }
  
    temperatureUpdated(temperature: number): void {
      const tempInKalvin = temperature + 273;
      this.byTemperatureService.setNext(tempInKalvin);
    }
  
    minusTemp(): void {
      if(this.min < this.temparature) {
        this.temparature = this.temparature - 25;
        this.temperatureUpdated(this.temparature);
      }
    }
  
    plusTemp(): void {
      if(this.max > this.temparature) {
        this.temparature = this.temparature + 25;
        this.temperatureUpdated(this.temparature);
      }
    }
  
  
}
