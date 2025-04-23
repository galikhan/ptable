import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { ChemicalElement } from 'src/app/interface/chemical-element';
import { ShowElementService } from 'src/app/service/show-element.service';
import * as json from '../../../assets/ElementsAdditionalInfo.json';

export interface DiData {
  element: ChemicalElement | undefined;
  color: string;
  borderColor: string;
}
@Component({
  selector: 'app-element-info',
  templateUrl: './element-info.component.html',
  styleUrls: ['./element-info.component.scss'],
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatIconModule]
})
export class ElementInfoComponent implements OnInit {

  addInfo: any;
  importedJson: any;
  @Input() color = '';
  @Input() borderColor = '';
  @Input() number = 0;
  @Input() atomic_mass = 0;
  @Input() symbol = '';
  @Input() isMobile = false;


  constructor(
    public elementService: ShowElementService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    if (this.number) {
      this.importedJson = json;
      const be = this.importedJson[this.number];
      this.addInfo = be;
    }
  }
  
  toLower(name: string): string {
    return name ? name.toLowerCase() : '';
  }
}
