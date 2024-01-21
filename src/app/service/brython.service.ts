import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrythonStateService {


  private tokenSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public stateObservable: Observable<number>;

  constructor() {
    this.stateObservable = this.tokenSubject.asObservable();
  }

  public setNext(next: number) {
    return this.tokenSubject.next(next);
  }


}
