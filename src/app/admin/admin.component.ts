import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ApiService} from "./services/api.service";
import {ParentDatum} from "./constants/interface";
import {MatDialog} from "@angular/material/dialog";
import {TopicComponent} from "./dialogs/topic/topic.component";
import {ContentComponent} from "./dialogs/content/content.component";
import {CodeComponent} from "./dialogs/code/code.component";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { ContentService } from "../service/content.service";
import { Content } from "../interface/content";
import * as ace from 'ace-builds';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, AfterViewInit {
  addTopicName: string = "";
  parentData!: ParentDatum[];
  childData!: ParentDatum[];
  selectedSubTopic: any;
  selectedParentIndex!: number;
  isDisabledBtn!: boolean;
  routeTopicIndex!: number;
  routeSubtopicId!: number;
  contents: Content[] = [];
  @ViewChild('supEdit') public supedit!: ElementRef<HTMLElement>;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private service: ContentService
  ) {
  }
  
  ngAfterViewInit(): void {
    console.log('this.supedit', this.supedit);
    if(this.supedit) {
      const el=this.supedit.nativeElement;
      let aceEditor = ace.edit(el);
      aceEditor.session.setValue("<h1>Ace Editor works great in Angular!</h1>");
  
    }

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.routeTopicIndex = +params['topicId'];
      this.routeSubtopicId = +params['subtopicId'];
      // this.openCodeDialog(this.routeSubtopicId);

      this.service.findByTopic(this.routeSubtopicId).subscribe(contents => {
        this.contents = contents;
      });
      // console.log(this.routeTopicIndex, params['topicId'])
    });
    this.getParentTopics();
  }

  openCodeDialog(topic: number) {
    this.dialog.open(CodeComponent, {data: {topic:topic}, width: '50%'});
  }

  getParentTopics() {
    this.apiService.getParentTopics().subscribe(response => {
      this.parentData = response;
      if (this.routeTopicIndex) {
        this.selectedParentIndex = this.routeTopicIndex - 1;
        const childId = response[this.selectedParentIndex]?.id;
        console.log(childId)
        this.getTopicByParentId(childId);
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

  ifRouteHasTopic(parentIndex: number) {
    const topicId = this.routeTopicIndex; // 1
    return !!(topicId && (topicId - 1) == parentIndex);
  }

  isRouteHasSubtopic(children: ParentDatum) {
    return this.selectedSubTopic?.id === children.id;
  }

  onClickChild(children: any, parentIndex: number) {
    const parentTopic = parentIndex + 1;
    this.router.navigate(['/admin/topic/' + parentTopic + '/subtopic/', children.id])
    this.selectedParentIndex = parentIndex;
    this.selectedSubTopic = children;
  }

  // Admin side functions
  addContent() {
    const dialog = this.dialog.open(ContentComponent, {
      width: '50%'
    })
  }

  addCode() {
    const dialog = this.dialog.open(CodeComponent, {
      width: '50%'
    })
  }

  addTopic() {
    const parentDto = {
      name: this.addTopicName,
      parent: 1
    };
    this.apiService.createTopic(parentDto).subscribe(response => {
      console.log(response)
    })
  }

  addSubtopic(parent: ParentDatum) {
    const dialog = this.dialog.open(TopicComponent, {
      data: {
        type: 'child'
      },
      width: '20%'
    })

    dialog.afterClosed().subscribe((subTopicName => {
      if (subTopicName) {
        const childDto = {
          name: subTopicName,
          parent: parent.id,
          isRemoved: false
        }
        this.apiService.createTopic(childDto).subscribe((response: any) => {
          this.getTopicByParentId(response.parent)
        })
      }
    }))
  }

  deleteTopic(parentItem: ParentDatum) {
    this.isDisabledBtn = true;
    this.apiService.deleteTopic(parentItem).subscribe(response => {
      this.isDisabledBtn = false;
      this.getParentTopics();
    })
  }
}
