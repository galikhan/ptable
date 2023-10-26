import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChemicalElement } from '../interface/chemical-element';

@Injectable({
  providedIn: 'root'
})
export class ShowElementService {

  private elementSubject: BehaviorSubject<ChemicalElement | undefined> = new BehaviorSubject<ChemicalElement | undefined>(undefined);
  public element: Observable<ChemicalElement | undefined>;

  constructor() {
    this.element = this.elementSubject.asObservable();
  }

  public setNext(element: ChemicalElement | undefined) {
    return this.elementSubject.next(element);
  }
  // public setNext(next: string) {
  //   return this.elementSubject.next(next);
  // }
}
