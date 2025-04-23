import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ElementInfoComponent } from 'src/app/chemistry/element-info/element-info.component';

@Component({
  selector: 'app-element-info-mobile-wrapper',
  templateUrl: './element-info-mobile-wrapper.component.html',
  styleUrls: ['./element-info-mobile-wrapper.component.scss'],
  standalone: true,
  imports: [ElementInfoComponent, CommonModule]
})
export class ElementInfoMobileWrapperComponent {

  color = '';
  borderColor='';
  number = 0;
  symbol = '';
  atomic_mass=0;

  constructor(
    // public elementService: ShowElementService,
    private route: ActivatedRoute,
    ) {
  }

  ngOnInit(): void {
      this.route.queryParams.subscribe((qparam: any) => {
        console.log('qparam', qparam);
        this.number = qparam.number;
        this.symbol = qparam.symbol;
        this.atomic_mass = qparam.atomic_mass;
        this.color = qparam.color;
        this.borderColor = qparam.borderColor;
      });
    // }
  }

}
