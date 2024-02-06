import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import { ChemistryIcon } from '../interface/chemistry-icon';
import { ContentTest } from '../interface/content-test';

@Injectable({
  providedIn: 'root'
})
export class ContentTestService {

  private apiUrl = environment.apiUrl + '/content-test';

  constructor(private http: HttpClient) {
  }

  create(element: ContentTest): Observable<ContentTest> {
    return this.http.post<ContentTest>(this.apiUrl ,element);
  }

  update(element: ContentTest): Observable<ContentTest> {
    return this.http.put<ContentTest>(this.apiUrl ,element);
  }

  findByContentId(id: number): Observable<ContentTest []> {
    return this.http.get<ContentTest []>(this.apiUrl + '/by-content/' + id);
  }

  remove(id: number): Observable<number> {
    return this.http.delete<number>(this.apiUrl + '/id/' + id);
  }

}
