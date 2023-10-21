import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HighlightStateService {


  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public stateObservable: Observable<string>;

  constructor() {
    this.stateObservable = this.tokenSubject.asObservable();
  }

  public setNext(next: string) {
    return this.tokenSubject.next(next);
  }


}
