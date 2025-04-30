import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ChemicalElement } from 'src/app/interface/chemical-element';
import { ElementInfoService } from 'src/app/service/element-info.service';
import { ShowElementService } from 'src/app/service/show-element.service';

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
  atomicProperties: any;
  chemicalProperties: any;
  physicalProperties: any;
  howTaken: any;
  howSpread: any;
  howUsed: any;


  constructor(
    public elementService: ShowElementService,
    public service: ElementInfoService
  ) {
  }

  ngOnInit(): void {
    if (this.number) {
      // if(this.symbol === 'H') {
        this.service.findBySymbol(this.symbol).subscribe({
          next: (result: any) => {
            this.addInfo = result;
            if(result.atomicProperties) {
              this.atomicProperties = JSON.parse(result.atomicProperties);
            }
            if(result.physicalProperties) {
              this.physicalProperties = JSON.parse(result.physicalProperties);
            }
            if(result.chemicalProperties) {
              this.chemicalProperties = JSON.parse(result.chemicalProperties);
            }
            if(result.howTaken) {
              this.howTaken = JSON.parse(result.howTaken);
            }

            if(result.howSpread) {
              this.howSpread = JSON.parse(result.howSpread);
            }
            if(result.howUsed) {
              this.howUsed = JSON.parse(result.howUsed);
            }

          }
        });
      // } else {
      //   this.importedJson = json;
      //   const be = this.importedJson[this.number];
      //   this.addInfo = be;
      //   console.log('this.addInfo', this.addInfo);
      // }
    }
  }
  
  toLower(name: string): string {
    return name ? name.toLowerCase() : '';
  }
}
