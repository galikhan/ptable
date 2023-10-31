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
  // exports: [MatIconModule]
})
export class AddIconModule {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {

    iconRegistry.addSvgIcon('be_factory', sanitizer.bypassSecurityTrustResourceUrl('assets/elements/4/be_factory.svg'));
    iconRegistry.addSvgIcon('supercoil', sanitizer.bypassSecurityTrustResourceUrl('assets/elements/4/supercoil.svg'));
    iconRegistry.addSvgIcon('chemical', sanitizer.bypassSecurityTrustResourceUrl('assets/elements/4/chemical.svg'));
    iconRegistry.addSvgIcon('shuttle', sanitizer.bypassSecurityTrustResourceUrl('assets/elements/4/shuttle.svg'));
    iconRegistry.addSvgIcon('scull', sanitizer.bypassSecurityTrustResourceUrl('assets/elements/4/scull.svg'));
    iconRegistry.addSvgIcon('picker', sanitizer.bypassSecurityTrustResourceUrl('assets/elements/4/picker.svg'));

    // he 2
    iconRegistry.addSvgIcon('heliumballoon',  sanitizer.bypassSecurityTrustResourceUrl('assets/elements/2/HeliumBalloon.svg'));
    iconRegistry.addSvgIcon('airship',  sanitizer.bypassSecurityTrustResourceUrl('assets/elements/2/Airship.svg'));
    iconRegistry.addSvgIcon('gas',  sanitizer.bypassSecurityTrustResourceUrl('assets/elements/2/Gas.svg'));
    iconRegistry.addSvgIcon('helium',  sanitizer.bypassSecurityTrustResourceUrl('assets/elements/2/Helium.svg'));
    iconRegistry.addSvgIcon('space',  sanitizer.bypassSecurityTrustResourceUrl('assets/elements/2/Space.svg'));  }

}
