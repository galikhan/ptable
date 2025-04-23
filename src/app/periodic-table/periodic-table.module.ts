import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeriodicTableRoutingModule } from './periodic-table-routing.module';
import { PeriodicTableComponent } from './periodic-table.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';


import { CoreComponent } from '../core/core.component';
import { ElementComponent } from '../chemistry/common-components/element/element.component';
import { LightswitchComponent } from '../tests/lightswitch/lightswitch.component';
import { ElementInfoComponent } from '../chemistry/element-info/element-info.component';
import { IdElementComponent } from '../chemistry/common-components/id-element/id-element.component';
import { DiPopupElementComponent } from '../chemistry/di-popup-element/di-popup-element.component';
import { ElementInfoMobileWrapperComponent } from './components/element-info-mobile-wrapper/element-info-mobile-wrapper.component';

@NgModule(
    { 
    declarations: [

        PeriodicTableComponent,
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
        PeriodicTableRoutingModule,
        FormsModule,
        MatExpansionModule,
        MatDialogModule,
        MatIconModule,
        MatSliderModule,
        MatCardModule,

    ], 
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ] 
})
export class PeriodicTableModule { }
