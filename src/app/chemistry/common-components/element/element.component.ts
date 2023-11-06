import { Component, Input, OnInit } from '@angular/core';
import { ChemicalElement } from 'src/app/interface/chemical-element';
import { HighlightByTemperatureService } from 'src/app/service/highlight-by-temperature.service';
import { HighlightStateService } from 'src/app/service/highlight-state.service';
import { HighlightTypeService } from 'src/app/service/highlight-type.service';
import { ShowElementService } from 'src/app/service/show-element.service';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit {

  @Input() xaxis: number[] = [];
  @Input() yaxis: number[] = [];
  @Input() elements: Map<number, Map<number, ChemicalElement>> = new Map;
  @Input() hasEmptyCell: boolean = false;
  stateC = false;
  stateHg = false;
  stateH = false;
  stateRf = false;
  currentTemperature = 0;

  showMetals = true;
  showAlkaliMetals = true;
  showAlkalineEarthMetal = true;
  showLanthanoids = true;
  showActinoids = true;
  showTransitionMetals = true;
  showPostTransitionMetals = true;
  showMetalloids = true;
  showNonmetals = true;
  showReactiveNonmetals = true;
  showNobleGas = true;

  fireMelted = false;
  fireBoiled = false;
  fireSolidated = false;

  btn = 'mybutton';
  constructor(
    public stateService: HighlightStateService,
    public hightlightService: HighlightTypeService,
    public temperatureService: HighlightByTemperatureService,
    public showElementService: ShowElementService
  ) {

  }

  solids = ['metal', 'alkaline earth metal', 'lanthanide', 'actinide', 'metalloid', 'polyatomic nonmetal'];
  metals = []

  ngOnInit(): void {
    this.enableAllTypes();
    this.stateService.stateObservable.subscribe(result => {
      if (result === 'C') {
        this.stateC = true;
      } else if (result === 'Hg') {
        this.stateHg = true;
      } else if (result === 'H') {
        this.stateH = true;
      } else if (result === 'Rf') {
        this.stateRf = true;
      } else {
        this.disableAllStates();
      }
    });

    this.temperatureService.observable.subscribe(result => {
      this.currentTemperature = result;
    });

    this.hightlightService.type.subscribe(result => {

      if (result === 'metal') {
        this.disableAllTypes();
        this.showAlkaliMetals = true;
        this.showAlkalineEarthMetal = true;
        this.showPostTransitionMetals = true;
        this.showTransitionMetals = true;
        this.showLanthanoids = true;
        this.showActinoids = true;

      } else if (result === 'non-metal') {

        this.disableAllTypes();
        this.showReactiveNonmetals = true;
        this.showNobleGas = true;

      } else if (result === 'alkali metal') {
        this.disableAllTypes(); this.showAlkaliMetals = true;
      } else if (result === 'alkaline earth metal') {
        this.disableAllTypes(); this.showAlkalineEarthMetal = true;
      } else if (result === 'metalloid') {
        this.disableAllTypes(); this.showMetalloids = true;
      } else if (result === 'post-transition metal') {
        this.disableAllTypes(); this.showPostTransitionMetals = true;
      } else if (result === 'transition metal') {
        this.disableAllTypes(); this.showTransitionMetals = true;
      } else if (result === 'lanthanide') {
        this.disableAllTypes(); this.showLanthanoids = true;
      } else if (result === 'actinide') {
        this.disableAllTypes(); this.showActinoids = true;
      } else if (result === 'metalloid') {
        this.disableAllTypes(); this.showMetalloids = true;
      } else if (result === 'reactive non-metal') {
        this.disableAllTypes(); this.showReactiveNonmetals = true;
      } else if (result === 'noble gas') {
        this.disableAllTypes(); this.showNobleGas = true;
      } else {
        this.enableAllTypes();
      }



    });
  }


  disableAllStates() {
    this.stateC = false;
    this.stateHg = false;
    this.stateH = false;
    this.stateRf = false;
  }

  disableAllTypes() {
    this.showMetals = false;
    this.showAlkaliMetals = false;
    this.showAlkalineEarthMetal = false;
    this.showLanthanoids = false;
    this.showActinoids = false;
    this.showTransitionMetals = false;
    this.showPostTransitionMetals = false;
    this.showMetalloids = false;
    this.showNonmetals = false;
    this.showReactiveNonmetals = false;
    this.showNobleGas = false;
  }

  enableAllTypes() {
    this.showMetals = true;
    this.showAlkaliMetals = true;
    this.showAlkalineEarthMetal = true;
    this.showLanthanoids = true;
    this.showActinoids = true;
    this.showTransitionMetals = true;
    this.showPostTransitionMetals = true;
    this.showMetalloids = true;
    this.showNonmetals = true;
    this.showReactiveNonmetals = true;
    this.showNobleGas = true;
  }

  isSolid(element: any): boolean {
    return element.phase === 'Solid' ? true : false
  }

  isGas(element: any): boolean {
    return element.phase === 'Gas' ? true : false
  }

  isLiquid(element: any): boolean {
    return element.phase === 'Liquid' ? true : false
  }

  isUnknown(element: any): boolean {
    return element.phase === 'Unknown' ? true : false
  }

  isMetal(type: any): boolean { //console.log('ismelted');
    return type?.category === 'metals' ? true : false
  }
  isAlkaliMetal(type: any): boolean { return type?.category === 'alkali metal' ? true : false }
  isAlkalineEarthMetal(type: any): boolean { return type?.category === 'alkaline earth metal' ? true : false }
  isLanthanoid(type: any): boolean { return type?.category === 'lanthanide' ? true : false }
  isActinoid(type: any): boolean { return type?.category === 'actinide' ? true : false }
  isTransitionMetal(type: any): boolean { return type?.category === 'transition metal' ? true : false }
  isPostTransitionMetal(type: any): boolean { return type?.category === 'post-transition metal' ? true : false }
  isMetalloid(type: any): boolean { return type?.category === 'metalloid' ? true : false }
  isNonmetal(type: any): boolean { return type?.category === 'nonmetal' ? true : false }

  isNobleGas(type: any): boolean { return type?.category === 'noble gas' ? true : false }

  isReactiveNonmetal(type: any): boolean {
    const ternary = type?.category === 'reactive nonmetal' ||
      type?.category === 'polyatomic nonmetal' ||
      type?.category === 'diatomic nonmetal' ? true : false;
    return ternary;
  }

  isSolidated(element: ChemicalElement | undefined, temperature: number): boolean {
    if (element) {
      if (element.phase === 'Unknown') { return false; }
      if (temperature < element.melt) { return true; }
      if (!element.melt && element.phase === 'Solid') { return true; }
    }
    return false;
  }

  isMelted(element: ChemicalElement | undefined, temperature: number): boolean {
    if (element) {
      if (element.phase === 'Unknown') { return false; }
      if (!element.melt) { return false; }
      if (!element.melt && element.phase === 'Liquid') { return true; }
      if (temperature >= element.melt && (!element.boil || (element.boil && temperature < element.boil))) {
        return true;
      }
    }
    return false;
  }

  isBoiled(element: ChemicalElement | undefined, temperature: number): boolean {
    if (element) {
      if (element.phase === 'Unknown') { return false; }
      if (!element.boil && element.phase === 'Gas') { return true; }
      if (element.boil && temperature >= element.boil) {
        return true;
      }
    }
    return false;
  }

  isUnknownPhase(element: ChemicalElement | undefined, temperature: number): boolean {
    if (element) {
      if (element.phase === 'Unknown') { return true; }
    }
    return false;
  }

  showElement(element: ChemicalElement | undefined) {
    this.showElementService.setNext(element);
  }


  // fireOnBoiled(element: ChemicalElement | undefined, temperature: number): boolean {
  //   // return this.isBoiled(element)
  //   ret
  // }

  // this.fireBoiled = true;
  // this.disableFire();

  disableFire(): void {
    this.fireBoiled = false;
  }
 }
