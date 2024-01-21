import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Topic, ParentDTO} from "../constants/interface";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private apiUrl = 'http://localhost:8080/api/v1/topic'; // Replace with your API endpoint
  // private apiUrl = 'http://161.97.144.45:8282/api/v1/topic'; // Replace with your API endpoint
  private apiUrl = environment.apiUrl + '/topic';
  constructor(private http: HttpClient) { }

  getParentTopics() {
    return this.http.get<any>(this.apiUrl + "/parent/1")
  }

  createTopic(body: ParentDTO) {
    return this.http.post(this.apiUrl, body)
  }

  updateTopic(body: Topic) {
    return this.http.put(this.apiUrl, body)
  }

  deleteTopic(topic: Topic) {
    return this.http.delete(this.apiUrl + "/" + topic?.id)
  }

  getTopicByParentId(parentId: number) {
    return this.http.get<any>(this.apiUrl + "/parent/" + parentId)
  }
}
