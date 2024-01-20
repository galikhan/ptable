import {AfterViewInit, Component, ElementRef, OnInit} from "@angular/core";
import {ApiService} from "./services/api.service";
import {ParentDatum} from "./constants/interface";
import {MatDialog} from "@angular/material/dialog";
import {TopicComponent} from "./dialogs/topic/topic.component";
import EditorJS from '@editorjs/editorjs';
import {ContentComponent} from "./dialogs/content/content.component";
import {CodeComponent} from "./dialogs/code/code.component";

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


  /*Code editor*/
  // editor!: EditorJS;
  /*Code editor*/

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private elementRef: ElementRef
  ) {
  }

  ngAfterViewInit(): void {
    // this.editor = new EditorJS({
    //   holder: 'editorJs',
    // });
  }

  ngOnInit(): void {
    this.getParentTopics();
  }

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

  onClickChild(children: any, parentIndex: number) {
    this.selectedParentIndex = parentIndex;
    this.selectedSubTopic = children;
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

  getParentTopics() {
    this.apiService.getParentTopics().subscribe(response => {
      this.parentData = response;
    })
  }

  getTopicByParentId(parentId: number) {
    this.apiService.getTopicByParentId(parentId).subscribe(children => {
      this.childData = children;
    })
  }

  onClickAccordion(parentId: number, index: number) {
    // TODO call function on expand accordion, or collapse return;
    const accordionButton = document.querySelector('.accordion-button.collapsed');

    this.getTopicByParentId(parentId);
  }

  deleteTopic(parentItem: ParentDatum) {
    this.isDisabledBtn = true;
    this.apiService.deleteTopic(parentItem).subscribe(response => {
      this.isDisabledBtn = false;
      this.getParentTopics();
    })
  }


}
