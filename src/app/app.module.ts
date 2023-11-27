import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreComponent } from './core/core.component';
import { ElementComponent } from './chemistry/common-components/element/element.component';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { LightswitchComponent } from './tests/lightswitch/lightswitch.component';
import { ElementInfoComponent } from './chemistry/element-info/element-info.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AddIconModule } from './icon/add-icon/add-icon.module';
import { HttpClientModule } from '@angular/common/http';
import { IdElementComponent } from './chemistry/common-components/id-element/id-element.component';


@NgModule({
  declarations: [
    AppComponent,
    CoreComponent,
    ElementComponent,
    LightswitchComponent,
    ElementInfoComponent,
    IdElementComponent,
    // AddIconComponent
  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    FormsModule,
    MatIconModule,
    AddIconModule,
    HttpClientModule,
    MatCardModule
  ],
  exports: [
    ElementComponent,
    AddIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
