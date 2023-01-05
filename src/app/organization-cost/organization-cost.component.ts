import { HttpErrorResponse } from '@angular/common/http';
import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { OrganizationCostService } from '../core/organization-cost/organization-cost.service';
import { AlertService } from '../shared/messages/alert.service';

@Component({
  selector: 'app-organization-cost',
  templateUrl: './organization-cost.component.html',
  styleUrls: ['./organization-cost.component.scss'],
})
export class OrganizationCostComponent implements OnInit {
  orgs = [];
  searchedInput = '';
  message: any = '';

  constructor(private router: Router,
    private orgService: OrganizationCostService,
    private alert: AlertService) { }

  ngOnInit(): void {
    this.getOrgs();
  }

  getOrgs() {
    this.orgService.getOrganizations()
      .subscribe(orgs => {
        this.orgs = orgs.data
      }
      )
  }

  onAdd() {
    this.router.navigate(['organization-cost/new']);

  }

  onEdit(org) {
    console.log('delete :' + org.id)
    this.router.navigate(['organization-cost/' + org.id])
  }

  onDelete(org) {
    this.orgService.deleteOrganization(org.id)
      .subscribe(res => {
        if (res === org.id) {
          this.orgs.splice(org.id, 1)
        }
        this.getOrgs()
      })
  }
}
