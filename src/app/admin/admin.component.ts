import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ApiService} from "./services/api.service";
import {ParentDatum, TopicDto} from "./constants/interface";
import {MatDialog} from "@angular/material/dialog";
import {TopicComponent} from "./dialogs/topic/topic.component";



@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit{
	addTopicName: string = "";
	addSubTopicName: string = "";
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

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog
  ) {
  }

	onClickChild(children: any) {
		console.log(children)
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
          is_removed_: false
        }
        this.apiService.createTopic(childDto).subscribe((response:any) => {
          console.log(response);
          this.getTopicByParentId(response.parent)
        })
      }
    }))
  }

  ngOnInit(): void {
    this.getParentTopics();
  }

  private getParentTopics() {
    this.apiService.getParentTopics().subscribe(response => {
      console.log(response);
      this.parentData = response;
    })
  }

  getTopicByParentId(parentId: number) {
    this.apiService.getTopicByParentId(parentId).subscribe(response => {
      console.log(response)
    })
  }

}
