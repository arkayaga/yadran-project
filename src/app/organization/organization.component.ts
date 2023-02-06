import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrganizationService } from '../core/organization/organization.service';
import Swal from 'sweetalert2';
import { Organization } from '../core/organization/organization.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent {
  orgs = [];
  displayedColumns: string[] = [
    'org',
    'orgSD',
    'orgStatus',
    'contractDate',
    'contactPFN',
    'customerMP',
    'button'
  ];
  dataSource = new MatTableDataSource<Organization>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private orgService: OrganizationService,
    public dialog: MatDialog,
  ) {
    this.getlist();
  }

  table = [
    { columnDef: 'org', header: 'Organizasyon', cellDef: 'code', type: "text" },
    {
      columnDef: 'orgSD',
      header: 'Organizasyon Tarihi',
      cellDef: 'organizationStartDate',
      type: 'date'
    },
    {
      columnDef: 'orgStatus',
      header: 'Org. Durumu',
      cellDef: 'status ',
      type: 'text'
    },
    {
      columnDef: 'contractDate',
      header: 'Sözleşme Tarihi',
      cellDef: 'contractDate',
      type: 'date'
    },
    {
      columnDef: 'contactPFN',
      header: 'Müşteri',
      cellDef: 'contactPersonFullName',
      type: 'text'
    },
    {
      columnDef: 'customerMP',
      header: 'Müşteri Telefonu',
      cellDef: 'customerMobilePhone',
      type: 'text'
    }
  ];


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getlist() {
    this.orgService.getOrgs().subscribe((reses) => {
      this.orgs = reses.data;
      this.dataSource.data = this.orgs;
    });
  }

  onNew() {
    this.router.navigate(['organization/new']);

  }

  onEdit(org) {
    this.router.navigate(['organization/' + org.id])

  }

  onDelete(org) {
    Swal.fire({
      title: 'Silmek istediginize emin misiniz?',
      text: 'Bu islem geri alinamaz!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, Sil',
      cancelButtonText: 'Vazgec!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orgService.deleteOrg(org.id).subscribe(() => {
          Swal.fire('Silindi!', '', 'success');
          this.getlist();
        });
      } else {
        Swal.fire('Vazgecildi', '', 'info');
      }
    });
  }

  openDialog(org) {
    this.dialog.open(OrganizationDetailsComponent, {
        data: org.id
    })
  }
}
