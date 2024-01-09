import { Component } from '@angular/core';



@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
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
	]
	body: any;


	onClickChild(children: any) {
		console.log(children)
		this.body = children;
	}

	addTopic() {
		this.data.push({ topicName: this.addTopicName, children: [] })
		this.addTopicName = "";
	}

	addSubtopic() { }

}