import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Content } from '../interface/content';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  // private apiUrl = 'http://161.97.144.45:8282/api/v1/content';
  private apiUrl = 'http://localhost:8080/api/v1/content';
  constructor(private http: HttpClient) { }

  create(content: Content): Observable<Content> {
    return this.http.post<Content>(this.apiUrl, content);
  }

  update(content: Content) {
    return this.http.put<Content>(this.apiUrl, content);
  }

  remove(id: number) {
    return this.http.delete(this.apiUrl + "/" + id);
  }

  findByTopic(topicId: number) {
    return this.http.get<Content []>(this.apiUrl + "/topic/" + topicId);
  }

  findById(id: number) {
    return this.http.get<Content>(this.apiUrl + "/" + id);
  }

}
