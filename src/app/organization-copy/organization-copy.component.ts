import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrganizationService } from '../core/organization/organization.service';
import Swal from 'sweetalert2';
import { Organization } from '../core/organization/organization.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrganizationStatusService } from '../core/organization-status/organization-status.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-organization-copy',
  templateUrl: './organization-copy.component.html',
  styleUrls: ['./organization-copy.component.scss'],
})
export class OrganizationCopyComponent {
  form: FormGroup
  orgs = [];
  status = [];
  isLoading = false;
  skip = 0;
  take = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
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
  customPaginatorIntl = new MatPaginatorIntl();


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private orgService: OrganizationService,
    private orgStatus: OrganizationStatusService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) {
    this.getlist();
    this.initForm();
    this.loadData();
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
      cellDef: 'organizationStatus',
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
    this.customPagination();
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
      this.getStatus()
    });
  }

  getStatus() {
    this.orgStatus.getOrgsStatus().subscribe(status => {
      this.status = status.data
    })
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


  // tslint:disable-next-line:no-empty
  onSearch() { }

  initForm() {
    this.form = this.formBuilder.group({
      start: [null],
      end: [null],
      select: [null]
    })
  }

  loadData() {
    const request = {
      skip: this.skip,
      take: this.take,
    }
    this.isLoading = true;
    this.orgService.filterOrgs(request).subscribe()
  }

  pageChanged(event: PageEvent) {
    // tslint:disable-next-line:no-console
    console.log({ event });
    this.take = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.skip = this.take * event.pageIndex;
    this.loadData();
  }

  customPagination() {
    const paginator = this.paginator._intl
    paginator.itemsPerPageLabel = 'Gosterim ';
    paginator.nextPageLabel = 'Sonraki Sayfa ';
    paginator.previousPageLabel = 'Onceki Sayfa ';

    // tslint:disable-next-line:no-console
    console.log(paginator.getRangeLabel)

    paginator.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `Kayit bulunamadi.`;
      }
      length = Math.max(length, 0);
      const startIndex = page;
      return `${length} kayit icerisinden ${startIndex + 1}. sayfa  `;
    }

  }
}

