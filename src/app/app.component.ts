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
    const button = document.getElementById('mybutton1');
    this.brythonState.stateObservable.subscribe(result => {
      console.log('message from observable', result);
      if (result) {
        // console.log('result', result);
        const input  = document.getElementById('mybuttonparam');
        if(input) {
          input.setAttribute('value', result+'');          
          button?.click();
          // console.log('button clicked', button);
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
