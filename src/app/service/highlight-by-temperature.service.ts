import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HighlightByTemperatureService {

  private temperatureSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public observable: Observable<number>;

  constructor() {
    this.observable = this.temperatureSubject.asObservable();
  }

  public setNext(next: number) {
    return this.temperatureSubject.next(next);
  }
}
