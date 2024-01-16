import {Component, OnInit} from '@angular/core';
import {ApiService} from "./services/api.service";
import {ParentDatum} from "./constants/interface";
import {MatDialog} from "@angular/material/dialog";
import {TopicComponent} from "./dialogs/topic/topic.component";



@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit{
	addTopicName: string = "";
	data = [
		{
			topicName: "Ввод и вывод данных",
			children: [
				{ id: 1, name: "Ввод и вывод данных" },
				{ id: 2, name: "Сумма трех чисел", },
				{ id: 3, name: "Площадь прямоугольного треугольника", },
				{ id: 4, name: "Дележ яблок" },
			]
		}
	];
  parentData!: ParentDatum[];
  childData!: ParentDatum[];
	selectedSubTopic: any;
  selectedParentIndex!: number;
  isDisabledBtn!: boolean;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog
  ) {
  }
  ngOnInit(): void {
    this.getParentTopics();
  }


  onClickChild(children: any, parentIndex: number) {
    console.log(children);
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
      console.log(subTopicName)
      if (subTopicName) {
        const childDto = {
          name: subTopicName,
          parent: parent.id,
          isRemoved: false
        }
        this.apiService.createTopic(childDto).subscribe((response:any) => {
          console.log(response);
          this.getTopicByParentId(response.parent)
        })
      }
    }))
  }

  getParentTopics() {
    this.apiService.getParentTopics().subscribe(response => {
      console.log(response);
      this.parentData = response;
    })
  }

  getTopicByParentId(parentId: number) {
    this.apiService.getTopicByParentId(parentId).subscribe(children => {
      console.log(children);
      this.childData = children;
    })
  }

  deleteTopic(parentItem: ParentDatum) {
    this.isDisabledBtn = true;
    console.log(parentItem)
    this.apiService.deleteTopic(parentItem).subscribe(response => {
      this.isDisabledBtn = false;
      this.getParentTopics();
    })
  }

}
