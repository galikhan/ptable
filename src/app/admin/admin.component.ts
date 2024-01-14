import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ApiService} from "./services/api.service";
import {ParentDatum} from "./constants/interface";



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
	body: any;

  constructor(
    private apiService: ApiService
  ) {
  }

	onClickChild(children: any) {
		console.log(children)
		this.body = children;
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
    console.log(parent)
    const childDto = {
      name: this.addSubTopicName,
      parent: parent.id
    }
    this.apiService.createTopic(childDto).subscribe(response => {
      console.log(response)
    })
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
