import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ApiService} from "./services/api.service";
import {ChildContent, Topic, CreateParentDto} from "./constants/interface";
import {MatDialog} from "@angular/material/dialog";
import {TopicComponent} from "./dialogs/topic/topic.component";
import {ContentComponent} from "./dialogs/content/content.component";
import {CodeComponent} from "./dialogs/code/code.component";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ContentService} from "../service/content.service";
import {Content} from "../interface/content";
import * as ace from 'ace-builds';
import {DeleteConfirmationComponent} from "./dialogs/delete-confirmation/delete-confirmation.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, AfterViewInit {
  addTopicName: string = "";
  parentData!: Topic[];
  childData!: Topic[];
  childContent!: ChildContent[];
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
    private service: ContentService,
    private contentService: ContentService,
  ) {
  }

  ngAfterViewInit(): void {
    console.log('this.supedit', this.supedit);
    if (this.supedit) {
      const el = this.supedit.nativeElement;
      let aceEditor = ace.edit(el);
      aceEditor.session.setValue("<h1>Ace Editor works great in Angular!</h1>");
    }
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.routeTopicIndex = +params['topicId'];
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

  isRouteHasSubtopic(children: Topic) {
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
      data: {
        topic: this.routeSubtopicId,
        childContent: null
      },
      width: '30%'
    })
    dialog.afterClosed().subscribe(result => {
      console.log(result)
      this.findByTopic();
    })
  }

  editContent(childContent: any) {
    console.log(childContent);
    const dialog = this.dialog.open(ContentComponent, {
      data: {
        topic: this.routeSubtopicId,
        childContent: childContent
      },
      width: '30%'
    })

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.findByTopic();
      }
    })
  }

  deleteContent(childContent: any) {
    const dialog = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        type: 'content'
      },
      width: '30%'
    })
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.contentService.remove(childContent.id).subscribe(response => {
          this.findByTopic()
        })
      }
    })
  }

  addCode() {
    const dialog = this.dialog.open(CodeComponent, {
      data: {
        topic: this.routeSubtopicId,
        data: null
      },
      width: '50%'
    })
    dialog.afterClosed().subscribe(result => {
      console.log(result)
      this.findByTopic();
    })
  }

  openEditCodeDialog(content: Content) {
    console.log(content)
    const dialog = this.dialog.open(CodeComponent, {
      data: {
        topic: this.routeSubtopicId,
        data: content
      },
      width: '50%'
    })
    dialog.afterClosed().subscribe(result => {
      console.log(result)
      this.findByTopic();
    })
  }

  addTopic() {
    const parentDto: CreateParentDto = {
      name: this.addTopicName,
      parent: 1,
      isRemoved: false
    };
    this.apiService.createTopic(parentDto).subscribe(response => {
      console.log(response);
      this.getParentTopics();
      this.addTopicName = "";
    })
  }

  addSubtopic(childTopic: Topic) {
    const dialog = this.dialog.open(TopicComponent, {
      data: {
        type: 'child',
        data: null,
      },
      width: '30%'
    })

    dialog.afterClosed().subscribe((childTopicName => {
      if (childTopicName) {
        const childDto = {
          name: childTopicName,
          parent: childTopic.id,
          isRemoved: false
        }
        this.apiService.createTopic(childDto).subscribe((response: any) => {
          this.getTopicByParentId(response.parent)
        })
      }
    }))
  }

  deleteTopic(parentItem: Topic) {
    this.isDisabledBtn = true;
    const dialog = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        type: 'parent'
      },
      width: '30%'
    })
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.deleteTopic(parentItem).subscribe(response => {
          this.isDisabledBtn = false;
          this.getParentTopics();
        })
      }
    })
  }

  deleteSubtopic(selectedSubtopic: Topic) {
    const dialog = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        type: 'child'
      },
      width: '30%'
    })

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.deleteTopic(selectedSubtopic).subscribe(response => {
          this.isDisabledBtn = false;
          this.getParentTopics();
        })
      }
    })
  }

  editTopicName(selectedTopic: Topic) {
    console.log(selectedTopic)
    const dialog = this.dialog.open(TopicComponent, {
      data: {
        type: 'parent',
        data: selectedTopic,
      },
      width: '30%'
    })

    dialog.afterClosed().subscribe((topicName => {
      if (topicName) {
        const parentDto = {
          id: selectedTopic.id,
          name: topicName,
          parent: selectedTopic.parent,
          isRemoved: false
        }
        console.log(parentDto)
        this.apiService.updateTopic(parentDto).subscribe((response: any) => {
          this.router.navigate(['/admin']);
          this.getParentTopics();
        });
      }
    }))
  }

  editSubtopicName(selectedSubTopic: Topic) {
    console.log(selectedSubTopic);
    const dialog = this.dialog.open(TopicComponent, {
      data: {
        type: 'child',
        data: selectedSubTopic,
      },
      width: '30%'
    })

    dialog.afterClosed().subscribe((childTopicName => {
      if (childTopicName) {
        const childDto = {
          id: selectedSubTopic.id,
          name: childTopicName,
          parent: selectedSubTopic.parent,
          isRemoved: false
        }
        this.apiService.updateTopic(childDto).subscribe((response: any) => {
          this.getTopicByParentId(response.parent)
        })
      }
    }))
  }




}
