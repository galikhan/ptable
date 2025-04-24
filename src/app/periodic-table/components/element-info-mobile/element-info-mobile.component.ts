import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ElementInfoComponent } from 'src/app/periodic-table/components/element-info/element-info.component';

@Component({
  selector: 'app-element-info-mobile',
  templateUrl: './element-info-mobile.component.html',
  styleUrls: ['./element-info-mobile.component.scss'],
  standalone: true,
  imports: [ElementInfoComponent, CommonModule]
})
export class ElementInfoMobileComponent {

  color = '';
  borderColor='';
  number = 0;
  symbol = '';
  atomic_mass=0;

  constructor(
    private route: ActivatedRoute,
    ) {
  }

  ngOnInit(): void {
      this.route.queryParams.subscribe((qparam: any) => {
        this.number = qparam.number;
        this.symbol = qparam.symbol;
        this.atomic_mass = qparam.atomic_mass;
        this.color = qparam.color;
        this.borderColor = qparam.borderColor;
      });
  }

}
