import { Component, Inject } from '@angular/core';
import { AlertService } from '../../shared/messages/alert.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrganizationStatusService } from '../../core/organization-status/organization-status.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-status-details',
  templateUrl: './status-details.component.html',
  styleUrls: ['./status-details.component.scss'],
})
export class StatusDetailsComponent {
  form: FormGroup;
  reses = [];
  id: string;

  constructor(
    private orgService: OrganizationStatusService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<StatusDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
  ) {

    this.initForm();
    if (this.data && data !== 'new') {
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
    this.orgService.getOrgStatus(this.id)
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
            this.orgService.addOrgStatus(request).subscribe(() => {
              this.dialogRef.close();
            });

          }
          else {
            this.orgService.editOrgStatus(request).subscribe(() => {
              this.dialogRef.close();
            },
              error => {
                const errMsg = error.error.responseException.map(x => x.errorMessage);
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
