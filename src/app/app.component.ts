import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BrythonStateService } from './service/brython.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('button') runBrython!: ElementRef<HTMLInputElement>;

  constructor(
    // private elementRef: ElementRef<HTMLElement>,
    public brythonState: BrythonStateService
  ) { }

  ngAfterViewInit() {
    this.brythonState.stateObservable.subscribe(result => {
      if (result) {
        const input  = document.getElementById('mybuttonparam');
        if(input) {
          input.setAttribute('value', result);          
          document.getElementById('mybutton1')?.click();
        }
        
      }
    });
  }
  ngOnInit(): void {
    // const button = this.runBrython.nativeElement.value;
  }

  helloworld(){
    console.log('btn111');
  }

}
