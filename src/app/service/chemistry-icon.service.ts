import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import { ChemistryIcon } from '../interface/chemistry-icon';

@Injectable({
  providedIn: 'root'
})
export class ChemistryIconService {

  private apiUrl = environment.apiUrl + '/chemistry-icon';

  constructor(private http: HttpClient) {
  }

  findByElement(element: String): Observable<ChemistryIcon []> {
    return this.http.get<ChemistryIcon []>(this.apiUrl + "/element/" + element);
  }

}
