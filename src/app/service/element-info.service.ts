import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ElementInfo } from '../interface/chemistry/element-info';

@Injectable({
  providedIn: 'root'
})
export class ElementInfoService {

  private apiUrl = environment.apiUrl + '/element-info';

  constructor(
    private http: HttpClient,
    ) {
  }

  create(content: ElementInfo): Observable<ElementInfo> {
    return this.http.post<ElementInfo>(this.apiUrl, content);
  }

  update(content: ElementInfo): Observable<ElementInfo> {
    return this.http.put<ElementInfo>(this.apiUrl, content);
  }

  findBySymbol(symbol: string): Observable<ElementInfo> {
    return this.http.get<ElementInfo>(`${this.apiUrl}/symbol/${symbol}`);
  }
}
