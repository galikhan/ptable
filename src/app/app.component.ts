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
      console.log('message from observable', result);
      if (result.id) {
        const input = document.getElementById('mybuttonparam');
        input?.setAttribute('value', result.id + '');

        const id = result.id + '';
        if (result.type === 'runTest') {
          const button = document.getElementById('run-test-button');
          button?.click();
        } else {
          const button = document.getElementById('run-code-button');
          button?.click();
        }
      }
    });
  }
  ngOnInit(): void {
    // const button = this.runBrython.nativeElement.value;
  }

  helloworld() {
    console.log('btn111');
  }

}
