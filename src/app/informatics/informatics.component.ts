import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Topic} from "../admin/constants/interface";
import {ApiService} from "../admin/services/api.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ContentService} from "../service/content.service";
import {Content} from "../interface/content";
import {Location} from '@angular/common';
import {environment} from "../../environments/environment";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-informatics',
  templateUrl: './informatics.component.html',
  styleUrls: ['./informatics.component.scss']
})

export class InformaticsComponent implements OnInit, AfterViewInit {
  parentData!: Topic[];
  childData!: Topic[];
  selectedSubTopic: any;
  routeTopicIndex!: number;
  routeSubtopicId!: number;
  contents: Content[] = [];
  imageUrlPrefix = environment.domain + '/images';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private service: ContentService,
    private location: Location,
    private sanitizer: DomSanitizer
  ) {
  }


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.routeTopicIndex = +params['topicId']; // 2
      this.routeSubtopicId = +params['subtopicId'];
      if (this.routeSubtopicId) {
        this.findByTopic();
      }
    });

    this.getParentTopics();
  }

  findByTopic() {
    this.service.findByTopic(this.routeSubtopicId).subscribe(contents => {
      this.contents = contents;
    });
  }

  getParentTopics() {
    this.apiService.getParentTopics().subscribe(response => {
      this.parentData = response;
      if (this.routeTopicIndex) { // 2
        const parentId = response[this.routeTopicIndex - 1]?.id;
        this.getTopicByParentId(parentId);
      }
    })
  }

  onClickAccordion(parentId: number) {
    this.location.go('/informatics');
    this.getTopicByParentId(parentId);
  }


  getTopicByParentId(parentId: number) {
    this.apiService.getTopicByParentId(parentId).subscribe(children => {
      this.childData = children;
      if (this.routeSubtopicId) {
        const filteredChild = this.childData.filter(child => child?.id == this.routeSubtopicId);
        this.selectedSubTopic = filteredChild[0];
      }
    })
  }

  ngAfterViewInit() {
  }


  ifRouteHasTopic(parentIndex: number) {
    const topicId = this.routeTopicIndex; // 1
    return !!(topicId && (topicId - 1) == parentIndex);
  }

  isRouteHasSubtopic(index: number, children: Topic) {
    return this.selectedSubTopic?.id === children.id;
  }

  onClickChild(children: any, parentIndex: number) {
    const parentTopic = parentIndex + 1;
    this.router.navigate(['/informatics/topic/' + parentTopic + '/subtopic/', children.id])
    this.routeTopicIndex = parentIndex;
    this.selectedSubTopic = children;
  }

  returnDescription(url: string) {
    return this.sanitizer.bypassSecurityTrustHtml(url);
  }

  returnVideoId(videoUrl: any) {
    if (videoUrl) {
      const indexOfEqualSign = videoUrl.indexOf('=');
      const videoIdFull = videoUrl.substring(indexOfEqualSign + 1);
      return videoIdFull.split('&')[0];
    }
    return '';
  }

}
