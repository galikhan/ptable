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
  iconTypes!: [{ name: string; id: number; value: string }, { name: string; id: number; value: string }, {
    name: string;
    id: number;
    value: string
  }]

	constructor(
		public dialogRef: MatDialogRef<TopicComponent>,
    @Inject(MAT_DIALOG_DATA) public injectedData: any,
		private fb: FormBuilder
	) { }

	ngOnInit(): void {
    console.log(this.injectedData);
    this.iconTypes = [{id: 1, value: 'image', name: 'картинка'}, {id: 2, value: 'video', name: 'видео'}, {
      id: 3,
      value: 'code',
      name: 'задача'
    }];
    this.initForm();
  }

  initForm() {
    this.topicForm = this.fb.group({
      name: ['', [Validators.required]],
      iconType: ['', [Validators.required]],
    });

    if (this.injectedData) {
      this.topicForm.get('name')?.setValue(this.injectedData?.data?.name);
      this.topicForm.get('iconType')?.setValue(this.injectedData?.data?.iconType);
    }
  }

	closeModal(): void {
		this.dialogRef.close();
	}

	submitForm(): void {
		console.log(this.topicForm.value);
    // const topicName = this.topicForm.get('name')?.value;
    const topicDto = this.topicForm.value;
    if (topicDto) this.dialogRef.close(topicDto);
	}
}
