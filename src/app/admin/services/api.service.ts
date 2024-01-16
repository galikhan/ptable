import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ParentDTO} from "../constants/interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://161.97.144.45:8282/api/v1/topic'; // Replace with your API endpoint
  constructor(private http: HttpClient) { }

  getParentTopics() {
    return this.http.get<any>(this.apiUrl + "/parent/1")
  }

  createTopic(body: ParentDTO) {
    return this.http.post(this.apiUrl, body)
  }

  getTopicByParentId(parentId: number) {
    return this.http.get<any>(this.apiUrl + "/parent/" + parentId)
  }
}