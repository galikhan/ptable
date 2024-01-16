import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-topic',
	templateUrl: './topic.component.html',
	styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
	topicForm!: FormGroup;


	constructor(
		public dialogRef: MatDialogRef<TopicComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder
	) { }

	ngOnInit(): void {
		this.topicForm = this.fb.group({
			name: ['', [Validators.required]],
		});
	}

	closeModal(): void {
		this.dialogRef.close();
	}

	submitForm(): void {
		console.log(this.topicForm.value);
    const topicName = this.topicForm.get('name')?.value;
    if (topicName) this.dialogRef.close(topicName);
	}
}
