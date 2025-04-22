import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { BrythonMessage } from '../interface/brython-message';
import { Content } from '../interface/content';

@Injectable({
  providedIn: 'root'
})
export class BrythonStateService {


  private tokenSubject: BehaviorSubject<BrythonMessage> = new BehaviorSubject<BrythonMessage>({ id: 0, type: '' });
  public stateObservable: Observable<BrythonMessage>;

  constructor(private route: ActivatedRoute) {
    this.stateObservable = this.tokenSubject.asObservable();
  }

  public setNext(next: BrythonMessage) {
    return this.tokenSubject.next(next);
  }

}
