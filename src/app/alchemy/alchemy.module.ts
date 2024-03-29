import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlchemyRoutingModule } from './alchemy-routing.module';
import { AlchemyComponent } from './alchemy.component';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';

import { CoreComponent } from '../core/core.component';
import { ElementComponent } from '../chemistry/common-components/element/element.component';
import { LightswitchComponent } from '../tests/lightswitch/lightswitch.component';
import { ElementInfoComponent } from '../chemistry/element-info/element-info.component';
import { IdElementComponent } from '../chemistry/common-components/id-element/id-element.component';
import { DiPopupElementComponent } from '../chemistry/di-popup-element/di-popup-element.component';
import { ElementInfoMobileWrapperComponent } from './components/element-info-mobile-wrapper/element-info-mobile-wrapper.component';


@NgModule({
  declarations: [
    AlchemyComponent,
    CoreComponent,
    ElementComponent,
    LightswitchComponent,
    ElementInfoComponent,
    IdElementComponent,
    DiPopupElementComponent,
    ElementComponent,
    ElementInfoMobileWrapperComponent,

  ],
  imports: [
    CommonModule,
    AlchemyRoutingModule,
    MatSliderModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    MatCardModule,
    MatExpansionModule,
    MatDialogModule,

  ]
})
export class AlchemyModule { }
