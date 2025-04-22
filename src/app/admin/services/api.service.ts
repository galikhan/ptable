import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Topic, ParentDTO} from "../constants/interface";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl + '/topic';
  private apiPrivateUrl = environment.apiPrivateUrl + '/topic';
  constructor(private http: HttpClient) { }

  getParentTopics() {
    return this.http.get<any>(this.apiUrl + "/parent/1")
  }

  getTopicByParentId(parentId: number) {
    return this.http.get<any>(this.apiUrl + "/parent/" + parentId)
  }

  getPrivateParentTopics() {
    return this.http.get<any>(this.apiPrivateUrl + "/parent/1")
  }

  createTopic(body: ParentDTO) {
    return this.http.post(this.apiPrivateUrl, body)
  }

  updateTopic(body: Topic) {
    return this.http.put(this.apiPrivateUrl, body)
  }

  deleteTopic(topic: Topic) {
    return this.http.delete(this.apiPrivateUrl + "/" + topic?.id)
  }

}
