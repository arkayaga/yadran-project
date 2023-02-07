import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organization } from '../../../core/organization/organization.model';
import { OrganizationService } from '../../../core/organization/organization.service';

@Component({
  selector: 'app-details-route',
  templateUrl: './details-route.component.html',
  styleUrls: ['./details-route.component.scss'],
})
export class DetailsRouteComponent {
  id: string;
  organization: Organization;
  constructor(
    private orgService: OrganizationService,
    private route: ActivatedRoute,
  ) {

    this.route.params.subscribe(data => {
      // tslint:disable-next-line:no-string-literal
      if (data['id']) {
        // tslint:disable-next-line:no-string-literal
        this.getDetail(data['id']);
      }
    })
  }

  getDetail(organizationId: string) {
    this.orgService.getOrg(organizationId)
      .subscribe((res: any) => {
        // tslint:disable-next-line:no-console
        console.log(res)
        if (!res.isError) {
          this.organization = res.data;
        }
      });
  }
}
