import { Component, Input } from '@angular/core';
import { ChemicalElement } from 'src/app/interface/chemical-element';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent {

  @Input() xaxis: number [] = [];
  @Input() yaxis: number [] = []; 
  @Input() elements: Map<number, Map<number, ChemicalElement>> = new Map;


}
