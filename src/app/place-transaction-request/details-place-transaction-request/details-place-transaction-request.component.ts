import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlaceService } from '../../core/place/place.service';
import { PlaceTransactionRequestService } from '../../core/place-transaction-request/place-transaction-request.service';

@Component({
  selector: 'app-details-place-transaction-request',
  templateUrl: './details-place-transaction-request.component.html',
  styleUrls: ['./details-place-transaction-request.component.scss'],
})
export class DetailsPlaceTransactionRequestComponent {
  form: FormGroup;
  reqs = [];
  id: string;
  places = [];
  display = true
  fileToUpload: File

  constructor(
    private formBuilder: FormBuilder,
    private placeService: PlaceService,
    private placeTRService: PlaceTransactionRequestService,
    public dialogRef: MatDialogRef<DetailsPlaceTransactionRequestComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
  ) {
    this.initForm();

    if (this.data && data !== 'new') {
      this.form.disable()
      this.id = data;
      this.getDetail();
    }

    this.display = !this.data
    this.getPlaces();
  }

  initForm() {
    this.form = this.formBuilder.group({
      placeId: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      description: [null, [Validators.required]],
      safeName: [null],
      fileName: [null],

    })
  }

  getDetail() {
    this.placeTRService.getPlaceTransactionRequest(this.id)
      .subscribe((response: any) => {
        console.log(response)
        if (!response.isError) {
          this.form.patchValue({
            placeId: response.data.placeId,
            amount: response.data.amount,
            description: response.data.description,
          });
        }
      });
  };

  getPlaces() {
    this.placeService.getPlaces().subscribe(
      places => {
        this.places = places.data
      }
    );
  };

  onFileChange(event) {
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload)

  }

  onSave() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const formData: FormData = new FormData();

      formData.append('Description', this.form.get('description').value);
      formData.append('Amount', this.form.get('amount').value);
      formData.append('PlaceId', this.form.get('placeId').value);
      if (this.fileToUpload) {
        formData.append('FormFile', this.fileToUpload, this.fileToUpload.name);
      }

      this.placeTRService.addPlaceTransactionRequest(formData).subscribe(() => this.dialogRef.close())
    }
  }

}
