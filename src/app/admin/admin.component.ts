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
import {environment} from "src/environments/environment";
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, AfterViewInit {
  addTopicName: string = "";
  parentData!: Topic[];
  childData!: Topic[];
  selectedSubTopic: any;
  selectedParentIndex!: number;
  isDisabledBtn!: boolean;
  routeTopicIndex!: number;
  routeSubtopicId!: number;
  contents: Content[] = [];
  @ViewChild('supEdit') public supedit!: ElementRef<HTMLElement>;
  imageUrlPrefix = environment.domain + '/images';
  iframeHtml: SafeHtml = '';

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private service: ContentService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngAfterViewInit(): void {
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

  returnVideo(url: string) {
    return this.sanitizer.bypassSecurityTrustHtml(url);
  }

  getParentTopics() {
    this.apiService.getParentTopics().subscribe(response => {
      this.parentData = response;
      if (this.routeTopicIndex) {
        this.selectedParentIndex = this.routeTopicIndex - 1;
        const childId = response[this.selectedParentIndex]?.id;
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
        content: null
      },
      width: '30%'
    })
    dialog.afterClosed().subscribe(result => {
      this.findByTopic();
    })
  }

  editContent(childContent: any) {
    const dialog = this.dialog.open(ContentComponent, {
      data: {
        topic: this.routeSubtopicId,
        content: childContent
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
        this.service.remove(childContent.id).subscribe(response => {
          this.findByTopic();
        })
      }
    })
  }

  addCode() {
    const dialog = this.dialog.open(CodeComponent, {
      data: {
        topic: this.routeSubtopicId,
        content: null
      },
      width: '50%'
    })
    dialog.afterClosed().subscribe(result => {
      this.findByTopic();
    })
  }

  openEditCodeDialog(content: Content) {
    const dialog = this.dialog.open(CodeComponent, {
      data: {
        topic: this.routeSubtopicId,
        content: content
      },
      // width: '50%'
      width: '800px'
    })

    dialog.afterClosed().subscribe(() => {
      this.findByTopic();
    })
  }

  openDeleteCodeDialog(content: Content) {
    const dialog = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        type: 'code'
      },
      width: '30%'
    })

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.service.remove(content.id).subscribe(response => {
          this.findByTopic();
        });
      }
    });

  }

  addTopic() {
    const parentDto: CreateParentDto = {
      name: this.addTopicName,
      parent: 1,
      isRemoved: false
    };
    this.apiService.createTopic(parentDto).subscribe(response => {
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

    dialog.afterClosed().subscribe((topicDto => {
      if (topicDto) {
        const childDto = {
          name: topicDto.name,
          parent: childTopic.id,
          isRemoved: false,
          iconType: topicDto.iconType
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
    const dialog = this.dialog.open(TopicComponent, {
      data: {
        type: 'parent',
        data: selectedTopic,
      },
      width: '30%'
    })

    dialog.afterClosed().subscribe((topicDto => {
      if (topicDto) {
        const parentDto = {
          id: selectedTopic.id,
          name: topicDto.name,
          parent: selectedTopic.parent,
          isRemoved: false,
          iconType: 'topic'
        }
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

    dialog.afterClosed().subscribe((topicDto => {
      if (topicDto) {
        const childDto = {
          id: selectedSubTopic.id,
          name: topicDto.name,
          parent: selectedSubTopic.parent,
          isRemoved: false,
          iconType: topicDto.iconType
        }
        this.apiService.updateTopic(childDto).subscribe((response: any) => {
          this.getTopicByParentId(response.parent)
        })
      }
    }))
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/informatics'])
  }

}
