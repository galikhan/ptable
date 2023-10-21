import { Component, OnInit } from '@angular/core';
import * as json from '../assets/PeriodicTableJSON.json'
import { ChemicalElement } from './interface/chemical-element';
import { HighlightByTemperatureService } from './service/highlight-by-temperature.service';
import { HighlightStateService } from './service/highlight-state.service';
import { HighlightTypeService } from './service/highlight-type.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //in kelvin 
  max = 5727;
  min = -273;
  temparature = 0;

  title = 'ptable';
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

  constructor(
    public highlightStateService: HighlightStateService,
    public highlightTypeService: HighlightTypeService,
    public byTemperatureService: HighlightByTemperatureService
    ) {

  }

  ngOnInit(): void {



    const importedJson = json;
    this.elements = importedJson.elements

    const cts: Set<string> = new Set();
    this.elements.forEach(items => {
      cts.add(items.category);
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
    this.highlightStateService.setNext(state);
  }
  removeState(): void {
    this.highlightStateService.setNext('removeAllState');
  }

  highlightType(type: string): void {
      this.highlightTypeService.setNext(type);
  }
  removeType(): void {
      this.highlightTypeService.setNext('removeAllType');
  }

  temperatureUpdated(temperature: number): void {
    const tempInKalvin = temperature + 273;
    this.byTemperatureService.setNext(tempInKalvin);
  }

}


// diatomic nonmetal
// noble gas
// alkali metal
// alkaline earth metal
// metalloid
// polyatomic nonmetal
// post-transition metal
// transition metal
// lanthanide
// actinide
// unknown, probably transition metal
// unknown, probably post-transition metal
// unknown, probably metalloid
// unknown, predicted to be noble gas
// unknown, but predicted to be an alkali metal


