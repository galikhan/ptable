import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TopicComponent } from './dialogs/topic/topic.component';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
	constructor(
		public dialog: MatDialog
	) { }

	openModal() {
		const dialogRef = this.dialog.open(TopicComponent, {
			width: '40%',
			data: {
				title: 'My Modal',
				content: 'This is the content of my modal.',
			},
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log(`Dialog result: ${result}`);
		});
	}
}