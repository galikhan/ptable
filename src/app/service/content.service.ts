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
    private http: HttpClient,
    ) {
  }

  create(content: Content): Observable<Content> {
    return this.http.post<Content>(this.apiPrivateUrl, content);
  }

  update(content: Content) {
    return this.http.put<Content>(this.apiPrivateUrl, content);
  }

  remove(id: number) {
    return this.http.delete(this.apiPrivateUrl + "/" + id);
  }

  findByTopic(topicId: number) {
    return this.http.get<Content []>(this.apiUrl + "/topic/" + topicId);
  }

  uploadFile(file: File, childId: number): Observable<any> {
    const formParams = new FormData();
    formParams.append('file', file)
    formParams.append('id', childId.toString())

    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      // Add any additional headers if needed
    });

    return this.http.post(this.apiPrivateUrl, formParams);
  }

}
