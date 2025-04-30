import { Component, OnInit } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ElementInfoService } from 'src/app/service/element-info.service';
import { ElementInfo } from 'src/app/interface/chemistry/element-info';

@Component({
  selector: 'app-admin-chemistry',
  standalone: true,
  imports: [NzSpinModule, NzButtonModule, NzInputModule, NzSelectModule, NzCardModule, CommonModule, FormsModule, ReactiveFormsModule, NzFormModule],
  templateUrl: './admin-chemistry.component.html',
  styleUrl: './admin-chemistry.component.scss'
})
export class AdminChemistryComponent implements OnInit {

  validateForm: FormGroup;
  symbols = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn', 'Fr', 'Ra', 'Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og', 'Uue']
  selectedSymbol!: string;
  loading = false;

  constructor(
    private fb: NonNullableFormBuilder,
    private service: ElementInfoService,
    private messageService: NzMessageService
    ) {
      this.validateForm = this.initEmptyForm();
    }

  ngOnInit(): void {
  }

  initEmptyForm() {
    return this.fb.group({
      id: null,
      name: this.fb.control('', [Validators.required]),
      color: this.fb.control('', [Validators.required]),
      symbol: this.fb.control('', [Validators.required]),
      atomicProperties: this.fb.control('', [Validators.required]),
      physicalProperties: this.fb.control('', [Validators.required]),
      chemicalProperties: this.fb.control('', [Validators.required]),
      howTaken: this.fb.control('', [Validators.required]),
      howSpread: this.fb.control('', [Validators.required]),
      howUsed: this.fb.control('', [Validators.required])
    });
  }

  onSymbolSelect(symbol: string) {
    this.loading = true;
    this.service.findBySymbol(symbol).subscribe({
      next: (result) => {
        if(result.id) {
          this.initForm(result);
          this.loading = false;
        } else {
          this.validateForm = this.initEmptyForm();
          this.loading = false;
        }
      }
    })
  }

  initForm(elementInfo: ElementInfo) {
    if(elementInfo.id) {
      this.validateForm =  this.fb.group({
        id: elementInfo.id,
        name: this.fb.control(elementInfo.name, [Validators.required]),
        color: this.fb.control(elementInfo.color, [Validators.required]),
        symbol: this.fb.control(elementInfo.symbol, [Validators.required]),
        atomicProperties: this.fb.control(elementInfo.atomicProperties, [Validators.required]),
        physicalProperties: this.fb.control(elementInfo.physicalProperties, [Validators.required]),
        chemicalProperties: this.fb.control(elementInfo.chemicalProperties, [Validators.required]),
        howTaken: this.fb.control(elementInfo.howTaken, [Validators.required]),
        howSpread: this.fb.control(elementInfo.howSpread, [Validators.required]),
        howUsed: this.fb.control(elementInfo.howUsed, [Validators.required])
      });
    }
}

  submitForm() {
    if (this.validateForm.valid) {
      const form: any = this.validateForm.getRawValue();
      if(form.id) {
        this.service.update(form).subscribe(() => {
          this.messageService.success('сәтті сақталды!')
        });
      } else {
        this.service.create(form).subscribe(() => {
          this.messageService.success('сәтті сақталды!')
        });
      }
    } else {  
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
