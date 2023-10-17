import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreComponent } from './core/core.component';
import { ElementComponent } from './chemistry/common-components/element/element.component';

@NgModule({
  declarations: [
    AppComponent,
    CoreComponent,
    ElementComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    ElementComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
