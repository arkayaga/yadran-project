import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrganizationService } from '../core/organization/organization.service';
import Swal from 'sweetalert2';
import { Organization } from '../core/organization/organization.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrganizationStatusService } from '../core/organization-status/organization-status.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { debounceTime } from 'rxjs';

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
  organizationStatusId: string;
  beginDate: string;
  endDate: string;
  totalItemsCount: number;
  skip = 0;
  take = 5;
  currentPage = 0;
  pageSize = 5;
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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  searchField = new FormControl();
  searchValue = '';

  constructor(
    private router: Router,
    private orgService: OrganizationService,
    private orgStatus: OrganizationStatusService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) {
    this.initForm();
    this.getStatus();
    this.loadData();

    this.searchField.valueChanges.pipe(
      debounceTime(500)).subscribe(value => {
        this.searchValue = value

        this.loadData();
        this.paginator.firstPage();

      });
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

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  // }

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
          this.loadData();
        });
      } else {
        Swal.fire('Vazgecildi', '', 'info');
      }
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      range: this.formBuilder.group({
        beginDate: [null],
        endDate: [null],
      }),
      organizationStatusId: [null]
    })
  }

  getRequest() {
    const beginDate = this.form.get('range').get('beginDate').value;
    const endDate = this.form.get('range').get('endDate').value;

    const request = {
      skip: this.skip,
      take: this.take,
      organizationStatusId: this.form.get('organizationStatusId').value,
      beginDate: beginDate ? moment(beginDate) : null,
      endDate: endDate ? moment(endDate) : null,
      search: this.searchValue
    }

    return request
  }

  loadData() {
    this.isLoading = true;
    this.orgService.filterOrgs(this.getRequest()).subscribe((reses :any) => {
      this.orgs = reses.data;
      this.dataSource.data = this.orgs;
      this.totalItemsCount = reses.pagination.totalItemsCount
    }).add(() => this.isLoading = false);
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.take = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.skip = this.take * event.pageIndex;
    this.loadData();

  }

  // customPagination() {
  //   const paginator = this.paginator._intl
  //   paginator.itemsPerPageLabel = 'Gosterim ';
  //   paginator.nextPageLabel = 'Sonraki Sayfa ';
  //   paginator.previousPageLabel = 'Onceki Sayfa ';

  //   paginator.getRangeLabel = (page: number, pageSize: number, length: number) => {
  //     if (length === 0 || pageSize === 0) {
  //       return `Kayit bulunamadi.`;
  //     }
  //     length = Math.max(length, 0);
  //     const startIndex = page;
  //     return `${length} kayit icerisinden ${startIndex + 1}. sayfa  `;
  //   }
  // }

  // onFind() {
  //   this.organizationStatusId = this.form.get('organizationStatusId').value
  //   this.beginDate = this.form.get('range.beginDate').value
  //   // tslint:disable-next-line:no-console
  //   console.log(moment(this.beginDate).format())
  //   this.endDate = this.form.get('range.endDate').value

  //   this.orgService.filterOrgs(this.getRequest()).subscribe(status => {

  //     const item = status.data.filter(x => x.organizationStatusId === this.organizationStatusId)
  //     // if (this.beginDate && this.endDate) {
  //     //   return item.organizationStartDate >= this.beginDate && x.organizationEndDate <= this.endDate;
  //     // }
  //     // tslint:disable-next-line:no-console
  //     console.log(item)
  //     // tslint:disable-next-line:no-console
  //     // console.log(beginDate)
  //     this.orgs = item;
  //     this.dataSource.data = this.orgs;
  //   });
  // };

  onClear() {
    this.form.reset();

    this.skip = 0;
    this.take = 5;

    this.loadData()
    this.paginator.firstPage();

  };
}


