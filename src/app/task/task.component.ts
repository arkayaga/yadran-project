import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  orderForm: FormGroup;
  items: FormArray;

  constructor(private formBuilder: FormBuilder) {
    this.orderForm = new FormGroup({
      items: new FormArray([])
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      text1: [null, [Validators.required]],
      text2: [null],
      select: [null, [Validators.required]]
    });
  }

  onAdd() {
    this.items = this.orderForm.get('items') as FormArray;
    if (this.orderForm.valid) {
      this.items.push(this.createItem());
    }
  }

  onDelete() {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.clear();
  }
}
