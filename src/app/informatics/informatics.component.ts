import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Topic} from "../admin/constants/interface";
import { ApiService } from "../admin/services/api.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import EditorJS from '@editorjs/editorjs';
import {ContentService} from "../service/content.service";
import {Content} from "../interface/content";
import {Location} from '@angular/common';

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
  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private service: ContentService,
    private location: Location
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

  returnIconBy(children: any) {
    if (children.iconType === 'video') {
      return 'assets/ptable/video.png';
    } else if (children.iconType === 'image') {
      return 'assets/ptable/image.png';
    }
    return 'assets/ptable/info.png';
  }

}
