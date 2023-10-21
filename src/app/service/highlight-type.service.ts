import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HighlightTypeService {

  private typeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public type: Observable<string>;

  constructor() {
    this.type = this.typeSubject.asObservable();
  }

  public setNext(next: string) {
    return this.typeSubject.next(next);
  }

}
