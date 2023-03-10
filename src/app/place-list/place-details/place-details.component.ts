import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../shared/messages/alert.service';
import Swal from 'sweetalert2';
import { PlaceService } from '../../core/place/place.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss'],
})

export class PlaceDetailsComponent {
  form: FormGroup
  id: string;

  constructor(
    private placeService: PlaceService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<PlaceDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
  ) {
    this.initForm();

    if(this.data && data !== 'new') {
      this.id = data;
      this.getDetail();
    }
  }


  initForm() {
    this.form = this.formBuilder.group({
      name: [null,
        [Validators.required]
      ],
      shortName: [null,
        [Validators.required]
      ],
      profitRate: [null,
        [Validators.required,
        Validators.min(0),
        Validators.max(100),
        Validators.pattern("^[0-9-.]*$")]
      ],
    });
  }


  getDetail() {
    this.placeService.getPlace(this.id)
      .subscribe((response: any) => {
        if (!response.isError) {
          this.form.patchValue({
            name: response.data.name,
            shortName: response.data.shortName,
            profitRate: response.data.profitRate
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
            shortName: this.form.get('shortName').value,
            profitRate: this.form.get('profitRate').value
          }

          if (!this.id) {
            this.placeService.addPlace(request).subscribe()
            // this.router.navigate(['place-list'])
            this.dialogRef.close();

          }
          else {
            this.placeService.editPlace(request).subscribe(() => {
              // this.router.navigate(['place-list'])
              this.dialogRef.close();
            },
              error => {
                // console.log(error.error.responseException[0].errorMessage)
                const errMsg = error.error.responseException.map(x => x.errorMessage);
                this.alertService.errorMsg(errMsg)
              });

          };
        }
        else if (result.isDenied) {
          this.alertService.errorMsg('Degisiklikten vazgecildi')
        }
      });

    }
  }
}


