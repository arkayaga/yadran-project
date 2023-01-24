import {  Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizationTypeService } from '../../core/organization-type/organization-type.service';
import { AlertService } from '../../shared/messages/alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-type-details',
  templateUrl: './type-details.component.html',
  styleUrls: ['./type-details.component.scss'],
})
export class TypeDetailsComponent {
  form: FormGroup;
  reses = [];
  id: string;

  constructor(
    private orgService: OrganizationTypeService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<TypeDetailsComponent>,
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
    this.orgService.getOrgType(this.id)
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
            this.orgService.addOrgType(request).subscribe()
            this.dialogRef.close();

          }
          else {
            this.orgService.editOrgType(request).subscribe(response => {
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
