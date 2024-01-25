import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule
  ],
})
export class AddIconModule {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('picker', sanitizer.bypassSecurityTrustResourceUrl('assets/elements/4/picker.svg'));
    iconRegistry.addSvgIcon('solid', sanitizer.bypassSecurityTrustResourceUrl('assets/elements/Si/Solid.svg'));
  }

}
