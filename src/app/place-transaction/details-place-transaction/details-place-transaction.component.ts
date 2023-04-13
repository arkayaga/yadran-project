import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlaceTransactionService } from '../../core/place-transaction/place-transaction.service';
import { Place } from '../../core/place/place.model';

@Component({
  selector: 'app-details-place-transaction',
  templateUrl: './details-place-transaction.component.html',
  styleUrls: ['./details-place-transaction.component.scss']
})
export class DetailsPlaceTransactionComponent {
  form: FormGroup;
  place:Place
  id: string;
  isAdd: boolean;


  constructor(
    private formBuilder: FormBuilder,
    private placeTranService: PlaceTransactionService,
    public dialogRef: MatDialogRef<DetailsPlaceTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
  ) {
    this.initForm();
    this.id = this.data
  }

  initForm() {
    this.form = this.formBuilder.group({
      amount: [null, [Validators.required]],
      description: [null]
    })
  }

  onSave() {
    const value = this.form.value;
    const request = {
      // placeId: this.place.id,
      placeId: this.id,
      amount: this.isAdd === true ? value?.amount : value?.amount * -1,
      description: value?.description,
    }

    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.placeTranService.addMoneyToPlaceCashbox(request).subscribe(() => {
        this.dialogRef.close(value?.amount)
      })
    }
  }
}
