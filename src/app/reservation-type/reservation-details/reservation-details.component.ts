import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReservationTypeService } from '../../core/reservation-type/reservation-type.service';
import { AlertService } from '../../shared/messages/alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss'],
})
export class ReservationDetailsComponent {
  form: FormGroup;
  reses = [];
  id: string;

  constructor(
    private resService: ReservationTypeService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<ReservationDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
  ) {

    this.initForm();
    if (data && data !== 'new') {
      this.id = data;
      this.getDetail();
    }
  }

  initForm() {
    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required)
    })
  }

  getDetail() {
    this.resService.getResType(this.id)
      .subscribe((response: any) => {
        if (!response.isError) {
          this.form.patchValue({
            name: response.data.name,
          });
        }
      });
  }

  onSave() {
    this.form.markAllAsTouched();
    if (this.form.valid) {

      Swal.fire({
        title: 'Degisikleri kaydetmek istediginize emin misiniz?',
        showDenyButton: true,
        confirmButtonText: 'Kaydet',
        denyButtonText: 'Vazgec',
      }).then((result) => {
        if (result.isConfirmed) {
          const request = {
            id: this.id ? this.id : null,
            name: this.form.get('name').value,
          }

          if (!this.id) {
            this.resService.addResType(request).subscribe()
            this.dialogRef.close();

          }
          else {
            this.resService.editResType(request).subscribe(response => {
              this.dialogRef.close();
            },
              error => {
                let errMsg = error.error.responseException.map(x => x.errorMessage);
                this.alertService.errorMsg(errMsg)
              });

          };
        }
        else {
          this.alertService.errorMsg('Degisiklikten vazgecildi')
        }
      });

    }
  }


}
