import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { iif } from 'rxjs';
import { ChemicalElement } from 'src/app/interface/chemical-element';
import { ChemistryIconService } from 'src/app/service/chemistry-icon.service';
import { HighlightByTemperatureService } from 'src/app/service/highlight-by-temperature.service';
import { HighlightStateService } from 'src/app/service/highlight-state.service';
import { HighlightTypeService } from 'src/app/service/highlight-type.service';
import { ShowElementService } from 'src/app/service/show-element.service';
import { DiPopupElementComponent } from '../../di-popup-element/di-popup-element.component';
import { ElementInfoComponent } from '../../element-info/element-info.component';

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
    public showElementService: ShowElementService,
    public di: MatDialog,
    private deviceService: DeviceDetectorService,
    private router: Router,
    public chemistryIconService: ChemistryIconService,
    public iconRegistry: MatIconRegistry, 
    public sanitizer: DomSanitizer
  ) {

  }

  solids = ['metal', 'alkaline earth metal', 'lanthanide', 'actinide', 'metalloid', 'polyatomic nonmetal'];
  metals = []

  ngOnInit(): void {
    console.log('elements', this.elements);
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
    
    if (element) {
      // this.loadIcons(element.symbol);  // ChemistryIconService
      
      this.chemistryIconService.findByElement(element.symbol).subscribe(result => {
        if(result) {
          console.log('icon result', result);
          result.forEach(item => {
            this.iconRegistry.addSvgIcon(item.name, this.sanitizer.bypassSecurityTrustResourceUrl(item.path));
          });

          const color = this.getColorOfElement(element);
          const borderColor = this.getBorderColorOfElement(element);

          if (this.deviceService.isDesktop()) {
            this.di.open(DiPopupElementComponent, 
              { width: "700px", 
                height: "800px",
                panelClass: "popup-element-info-panel",
                data: { 
                  symbol: element.symbol, number: element.number, atomic_mass: element.atomic_mass,
                  color, 
                  borderColor } 
              });

          } else {
            this.router.navigate(['/chemistry/element-mobile'], 
            {queryParams: 
              { symbol: element.symbol, number: element.number, atomic_mass: element.atomic_mass,
                color, 
                borderColor}
            })
          }
          // console.log('icon pack is loaded')
        }
      })
      // console.log('after icons loaded element', element);

    }
  }

  getColorOfElement(element: ChemicalElement): string {
    let color = ""; let borderColor = "";
    if (this.isMetal(element)) {
      color = 'white'; borderColor = '#ddd';
    } else if (this.isAlkaliMetal(element)) {
      color = '#eace5d'; borderColor = '#CBB043';
    }
    else if (this.isAlkalineEarthMetal(element)) {
      color = '#f1f165'; borderColor = '#D9D94C';
    }
    else if (this.isLanthanoid(element)) {
      color = '#e8d19c'; borderColor = '#CBB071';
    }
    else if (this.isActinoid(element)) {
      color = '#f5ccda'; borderColor = '#EAA5BD';
    }
    else if (this.isTransitionMetal(element)) {
      color = '#fac5b7'; borderColor = '#E8AD9D';
    }
    else if (this.isPostTransitionMetal(element)) {
      color = '#acdfec'; borderColor = '#79BACB';
    }
    else if (this.isMetalloid(element)) {
      color = '#9ee5d4'; borderColor = '#6BC6B0';
    }
    else if (this.isNonmetal(element)) {
      color = '#EDEDED'; borderColor = '#DCDADA';
    }
    else if (this.isNobleGas(element)) {
      color = '#e5bde5'; borderColor = '#CC96CC';
    }
    else if (this.isReactiveNonmetal(element)) {
      color = '#8ced8c'; borderColor = '#72D272';
    }
    return color;
  }

  getBorderColorOfElement(element: ChemicalElement): string {
    let color = ""; let borderColor = "";
    if (this.isMetal(element)) {
      color = 'white'; borderColor = '#ddd';
    } else if (this.isAlkaliMetal(element)) {
      color = '#eace5d'; borderColor = '#CBB043';
    }
    else if (this.isAlkalineEarthMetal(element)) {
      color = '#f1f165'; borderColor = '#D9D94C';
    }
    else if (this.isLanthanoid(element)) {
      color = '#e8d19c'; borderColor = '#CBB071';
    }
    else if (this.isActinoid(element)) {
      color = '#f5ccda'; borderColor = '#EAA5BD';
    }
    else if (this.isTransitionMetal(element)) {
      color = '#fac5b7'; borderColor = '#E8AD9D';
    }
    else if (this.isPostTransitionMetal(element)) {
      color = '#acdfec'; borderColor = '#79BACB';
    }
    else if (this.isMetalloid(element)) {
      color = '#9ee5d4'; borderColor = '#6BC6B0';
    }
    else if (this.isNonmetal(element)) {
      color = '#EDEDED'; borderColor = '#DCDADA';
    }
    else if (this.isNobleGas(element)) {
      color = '#e5bde5'; borderColor = '#CC96CC';
    }
    else if (this.isReactiveNonmetal(element)) {
      color = '#8ced8c'; borderColor = '#72D272';
    }
    return borderColor;
  }

  disableFire(): void {
    this.fireBoiled = false;
  }

  async loadIcons(element: string) {
    
    await this.chemistryIconService.findByElement(element).subscribe(result => {
      if(result) {
        result.forEach(item => {
          this.iconRegistry.addSvgIcon(item.name, this.sanitizer.bypassSecurityTrustResourceUrl(item.path));
        });
      }
    })
  }

}
