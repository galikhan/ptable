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
    console.log('icon module addd workded');
    iconRegistry.addSvgIcon('picker', sanitizer.bypassSecurityTrustResourceUrl('assets/elements/4/picker.svg'));
    iconRegistry.addSvgIcon('solid', sanitizer.bypassSecurityTrustResourceUrl('assets/elements/Si/Solid.svg'));
    iconRegistry.addSvgIcon('subtopic_video', sanitizer.bypassSecurityTrustResourceUrl('assets/ptable/video.svg'));
    iconRegistry.addSvgIcon('subtopic_task', sanitizer.bypassSecurityTrustResourceUrl('assets/ptable/calc.svg'));
    iconRegistry.addSvgIcon('subtopic_info', sanitizer.bypassSecurityTrustResourceUrl('assets/ptable/book.svg'));
  }

}
