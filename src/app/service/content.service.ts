import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Content} from '../interface/content';
import {environment} from "../../environments/environment";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl = environment.apiUrl + '/content';
  private apiPrivateUrl = environment.apiPrivateUrl + '/content';

  constructor(
    private http: HttpClient
    ,
    private authService: AuthService
    ) {
  }

  create(content: Content): Observable<Content> {
    // const headers = new HttpHeaders()
    // .set('content-type', 'application/json')
    // .set('Authorization', 'Bearer ' + this.authService.token());
    // return this.http.post<Content>(this.apiPrivateUrl, content, { headers: headers });
    return this.http.post<Content>(this.apiPrivateUrl, content);
  }

  update(content: Content) {
    // const headers = new HttpHeaders()
    // .set('content-type', 'application/json')
    // .set('Authorization', 'Bearer ' + this.authService.token());
    // return this.http.put<Content>(this.apiPrivateUrl, content, { headers: headers });
    return this.http.put<Content>(this.apiPrivateUrl, content);
  }

  remove(id: number) {
    return this.http.delete(this.apiPrivateUrl + "/" + id);
  }

  findByTopic(topicId: number) {
    return this.http.get<Content []>(this.apiUrl + "/topic/" + topicId);
  }

  findById(id: number) {
    return this.http.get<Content>(this.apiUrl + "/" + id);
  }

}
