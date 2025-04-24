import { Routes } from '@angular/router';
import { PeriodicTableComponent } from './periodic-table.component';
import { ElementInfoMobileComponent } from './components/element-info-mobile/element-info-mobile.component';

export const MAIN_ROUTES: Routes = [
  { path: '', component: PeriodicTableComponent },
  { path: 'element-mobile', component: ElementInfoMobileComponent }
];
