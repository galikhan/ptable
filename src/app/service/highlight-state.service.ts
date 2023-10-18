import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HighlightStateService {


  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public token: Observable<string> | undefined;

  constructor() {
    this.token = this.tokenSubject.asObservable();
  }

  public setNext(next: string) {
    return this.tokenSubject.next(next);
  }


}
