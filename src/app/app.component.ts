import { Component, OnInit } from '@angular/core';
import * as json from '../assets/PeriodicTableJSON.json'
import { ChemicalElement } from './interface/chemical-element';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ptable';
  lefttop_yaxis = [1, 2, 3];
  lefttop_xaxis = [1, 2];

  righttop_yaxis = [1, 2, 3];
  righttop_xaxis = [13, 14, 15, 16, 17, 18];

  body_yaxis = [0];
  body_xaxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  elements: ChemicalElement[] = [];
  leftTopArray: Map<number, Map<number, ChemicalElement>> = new Map;
  rightTopArray: Map<number, Map<number, ChemicalElement>> = new Map;
  bodyArray: Map<number, Map<number, ChemicalElement>> = new Map;
  
  ngOnInit(): void {

    const importedJson = json;
    this.elements = importedJson.elements
    const leftTopTemp = this.filterBySymbol(['H', 'Li', 'Be', 'Na', 'Mg']);
    this.leftTopArray = this.convertToMap(leftTopTemp);

    const rightTopTemp = this.filterBySymbol(['He','B','C','N','O','F','Ne','Al','Si','P','S','Cl','Ar',]);
    this.rightTopArray = this.convertToMap(rightTopTemp);
    console.log('this.rightTopArray', this.rightTopArray);

    const bodyTemp = this.filterByNumberRange(19, 54);
    this.bodyArray = this.convertToMap(bodyTemp);
    
  }

  filterBySymbol(symbols: string[]): ChemicalElement[] {
    return this.elements.filter(item => symbols.indexOf(item.symbol) != -1);
  }

  filterByNumberRange(start: number, end: number): ChemicalElement[] {
    return this.elements.filter(item => item.number >= start && item.number <= end);
  }

  convertToMap(leftTopTemp: ChemicalElement[], ): Map<number, Map<number, ChemicalElement>> {
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

  righttop: any =
    {
      0: {
        6: {
          "symbol": "He"
        }
      },
      1: {
        1: {
          "symbol": "B",
        },
        2: {
          "symbol": "C",
        },
        3: {
          "symbol": "N",
        },
        4: {
          "symbol": "O",
        },
        5: {
          "symbol": "F",
        },
        6: {
          "symbol": "Ne",
        },
      },
      2: {
        1: {
          "element": "Sodium",
          "symbol": "Al",
        },
        2: {
          "element": "Magnesium",
          "symbol": "Si",
        },
        3: {
          "symbol": "P",
        },
        4: {
          "symbol": "S",
        },
        5: {
          "symbol": "Cl",
        },
        6: {
          "symbol": "Ar",
        },

      }

    }

  bodyelements: any = {
    0: {
      1: { "symbol": "B1" },
      2: { "symbol": "C1" },
      3: { "symbol": "N1" },
      4: { "symbol": "O1" },
      5: { "symbol": "F1" },
      6: { "symbol": "Ne1" },
      7: { "symbol": "Ne1" },
      8: { "symbol": "Ne1" },
      9: { "symbol": "Ne1" },
      10: { "symbol": "Ne13" },
      11: { "symbol": "Ne14" },
      12: { "symbol": "Ne15" },
      13: { "symbol": "Ne166" },
      14: { "symbol": "Ne17" },
      15: { "symbol": "Ne18" },
      16: { "symbol": "Ne199" },
      17: { "symbol": "Ne10" },
      18: { "symbol": "Ne18" },
    },
  }
}


  // ,
  // 18: {
  //   "element": "Helium",
  //   "symbol": "He"
  // },
  // 13: {
  //   "element": "Boron",
  //   "symbol": "B",
  // },
  // 14: {
  //   "element": "Carbon",
  //   "symbol": "C",
  // },
  // 15: {
  //   "element": "Nitrogen",
  //   "symbol": "N",
  // },
  // 16: {
  //   "element": "Oxygen",
  //   "symbol": "O",
  // },
  // 17: {
  //   "element": "Fluorine",
  //   "symbol": "F",
  // },
  // 18: {
  //   "element": "Neon",
  //   "symbol": "Ne",
  // }  

  // ,
  //     13: {
  //       "element": "Aluminum",
  //       "symbol": "Al",
  //     },
  //     14: {
  //       "element": "Silicon",
  //       "symbol": "Si",
  //     },
  //     15: {
  //       "element": "Phosphorus",
  //       "symbol": "P",
  //     }