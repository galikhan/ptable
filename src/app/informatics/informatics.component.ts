import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ParentDatum } from "../admin/constants/interface";
import { ApiService } from "../admin/services/api.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import EditorJS from '@editorjs/editorjs';


@Component({
  selector: 'app-informatics',
  templateUrl: './informatics.component.html',
  styleUrls: ['./informatics.component.scss']
})

export class InformaticsComponent implements OnInit, AfterViewInit {
  @ViewChild('editorjs', { static: false }) public el!: ElementRef<HTMLElement>;
  parentData!: ParentDatum[];
  childData!: ParentDatum[];
  selectedSubTopic: any;
  routeTopicIndex!: number;
  routeSubtopicId!: number;
  
  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.routeTopicIndex = +params['topicId']; // 2
      this.routeSubtopicId = +params['subtopicId'];
    });

    this.getParentTopics();
  }

  getParentTopics() {
    this.apiService.getParentTopics().subscribe(response => {
      this.parentData = response;
      if (this.routeTopicIndex) { // 2
        const parentId = response[this.routeTopicIndex - 1]?.id;
        console.log(parentId) // 8
        this.getTopicByParentId(parentId);
      }
    })
  }

  onClickAccordion(parentId: number) {
    this.getTopicByParentId(parentId);
  }


  getTopicByParentId(parentId: number) {
    this.apiService.getTopicByParentId(parentId).subscribe(children => {
      this.childData = children;
      if (this.routeSubtopicId) {
        const filteredChild = this.childData.filter(child => child?.id == this.routeSubtopicId);
        this.selectedSubTopic = filteredChild[0];
        console.log(this.selectedSubTopic)
      }
    })
  }

  ngAfterViewInit() {
    // const native = document.getElementById('editorjs');
    // if (native) {
    const editor = new EditorJS({
      holder: this.el.nativeElement,
      tools: {
        // header: Header,
        // list: List
      },
    });
    // }
  }


  ifRouteHasTopic(parentIndex: number) {
    const topicId = this.routeTopicIndex; // 1
    return !!(topicId && (topicId - 1) == parentIndex);
  }

  isRouteHasSubtopic(index: number, children: ParentDatum) {
    return this.selectedSubTopic?.id === children.id;
  }

  onClickChild(children: any, parentIndex: number) {
    const parentTopic = parentIndex + 1;
    this.router.navigate(['/informatics/topic/' + parentTopic + '/subtopic/', children.id])
    this.routeTopicIndex = parentIndex;
    this.selectedSubTopic = children;
  }

}
