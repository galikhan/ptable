import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BrythonMessage } from '../interface/brython-message';

@Injectable({
  providedIn: 'root'
})
export class BrythonStateService {


  private tokenSubject: BehaviorSubject<BrythonMessage> = new BehaviorSubject<BrythonMessage>({ id: 0, type: '' });
  public stateObservable: Observable<BrythonMessage>;

  constructor() {
    this.stateObservable = this.tokenSubject.asObservable();
  }

  public setNext(next: BrythonMessage) {
    return this.tokenSubject.next(next);
  }


}
