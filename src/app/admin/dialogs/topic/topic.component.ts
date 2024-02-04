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
  isParentContent!: boolean;
  isChildContent!: boolean;

	constructor(
		public dialogRef: MatDialogRef<TopicComponent>,
    @Inject(MAT_DIALOG_DATA) public injectedData: any,
		private fb: FormBuilder
	) { }

	ngOnInit(): void {
    this.iconTypes = [
      {id: 1, value: 'subtopic_info', name: 'описание'}, 
      {id: 2, value: 'subtopic_video', name: 'видео'}, 
      {id: 3, value: 'subtopic_task', name: 'задача' }
    ];
    this.initForm();
    this.isParentContent = this.injectedData.type === 'parent';
    this.isChildContent = this.injectedData.type === 'child';
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

  submitForm(): void {
    const topicDto = this.topicForm.value;
    // Assuming this.isParentContent is a boolean
    topicDto.iconType = this.isParentContent ? '0' : topicDto.iconType;
    this.dialogRef.close(topicDto);
  }
}
