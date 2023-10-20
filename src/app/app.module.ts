import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreComponent } from './core/core.component';
import { ElementComponent } from './chemistry/common-components/element/element.component';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';


@NgModule({
  declarations: [
    AppComponent,
    CoreComponent,
    ElementComponent
  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    FormsModule
  ],
  exports: [
    ElementComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
