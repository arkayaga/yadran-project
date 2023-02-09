import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Organization } from '../../../core/organization/organization.model';
import { OrganizationService } from '../../../core/organization/organization.service';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss'],
})
export class DetailsModalComponent {
  organization: Organization
  code: string
  constructor(
    private orgService: OrganizationService,
    public dialogRef: MatDialogRef<DetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
  ) {
    if (this.data) {
      this.getDetail();
    }
  }

  getDetail() {
    this.orgService.getOrg(this.data)
      .subscribe((res: any) => {
        // tslint:disable-next-line:no-console
        console.log(res)
        if (!res.isError) {
          this.organization = res.data;
        }
      });
  }
}
