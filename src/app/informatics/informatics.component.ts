import {Component, OnInit} from '@angular/core';
import {ParentDatum} from "../admin/constants/interface";
import {ApiService} from "../admin/services/api.service";
import {ActivatedRoute, Params, Router} from "@angular/router";


@Component({
  selector: 'app-informatics',
  templateUrl: './informatics.component.html',
  styleUrls: ['./informatics.component.scss']
})
export class InformaticsComponent implements OnInit{
  parentData!: ParentDatum[];
  childData!: ParentDatum[];
  selectedSubTopic: any;
  selectedParentIndex!: number;
  routeSubtopicId!: number;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.selectedParentIndex = +params['topicId']; // 2
      console.log(this.selectedParentIndex);
      this.routeSubtopicId = +params['subtopicId'];
    });

    this.getParentTopics();
  }

  getParentTopics() {
    this.apiService.getParentTopics().subscribe(response => {
      this.parentData = response;
      if (this.selectedParentIndex) { // 2
        const parentId = response[this.selectedParentIndex - 1]?.id;
        console.log(parentId) // 8
        this.getTopicByParentId(parentId);
      }
    })
  }

  onClickAccordion(parentId: number, index: number) {
    this.getTopicByParentId(parentId);
  }

  getTopicByParentId(parentId: number) {
    this.apiService.getTopicByParentId(parentId).subscribe(children => {
      this.childData = children;
      if (this.routeSubtopicId) {
        const filteredChild = this.childData.filter(child=> child?.id == this.routeSubtopicId);
        this.selectedSubTopic = filteredChild[0];
        console.log(this.selectedSubTopic)
      }
      // this.selectedSubTopic = children[this.selectedParentIndex];
    })
  }

  ifRouteHasTopic(parentIndex: number) {
    const topicId = this.selectedParentIndex; // 1
    return !!(topicId && (topicId - 1) == parentIndex);
  }

  isRouteHasSubtopic(index: number, children: ParentDatum) {
    // console.log(this.selectedSubTopic) // element, object;
    // const filtered = this.childData.filter(child => child.id == this.selectedSubTopic?.id);
    // console.log(filtered)
  return false;
  }

  onClickChild(children: any, parentIndex: number) {
    const parentTopic = parentIndex + 1;
    this.router.navigate(['/informatics/topic/' + parentTopic + '/subtopic/', children.id])
    this.selectedParentIndex = parentIndex;
    this.selectedSubTopic = children;
  }

}
