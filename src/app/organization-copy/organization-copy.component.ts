import { AfterViewInit, Component, ViewChild } from '@angular/core';
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
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-organization-copy',
  templateUrl: './organization-copy.component.html',
  styleUrls: ['./organization-copy.component.scss'],
})
export class OrganizationCopyComponent implements AfterViewInit {
  form: FormGroup;
  orgs: Organization[] = [];
  status = [];
  isLoading = false;
  organizationStatusId: string;
  beginDate: string;
  endDate: string;
  totalItemsCount = 0;
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
    'button',
  ];
  dataSource = new MatTableDataSource<Organization>(this.orgs);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchField = new FormControl();
  searchValue = '';

  count = 10;

  table = [
    {
      columnDef: 'org',
      header: 'organizations',
      cellDef: 'code',
      type: 'text',
    },
    {
      columnDef: 'orgSD',
      header: 'organizationDate',
      cellDef: 'organizationStartDate',
      type: 'date',
    },
    {
      columnDef: 'orgStatus',
      header: 'organizationStatus',
      cellDef: 'organizationStatus',
      type: 'status',
    },
    {
      columnDef: 'contractDate',
      header: 'contDate',
      cellDef: 'contractDate',
      type: 'date',
    },
    {
      columnDef: 'contactPFN',
      header: 'contactPersonFullName',
      cellDef: 'contactPersonFullName',
      type: 'text',
    },
    {
      columnDef: 'customerMP',
      header: 'customerMobilePhone',
      cellDef: 'customerMobilePhone',
      type: 'text',
    },
  ];

  constructor(
    private router: Router,
    private orgService: OrganizationService,
    private orgStatus: OrganizationStatusService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public translateService: TranslateService
  ) {
    this.initForm();
    this.getStatus();
    this.loadData();

    this.searchField.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.searchValue = value;

        this.loadData();
        this.paginator.firstPage();
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getStatus() {
    this.orgStatus.getOrgsStatus().subscribe((status) => {
      this.status = status.data;
    });
  }

  onAdd() {
    this.router.navigate(['organization/new']);
  }

  onEdit(org: Organization) {
    this.router.navigate(['organization/' + org.id]);
  }

  onDelete(org: Organization) {
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
      organizationStatusId: [null],
    });
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
      search: this.searchValue,
    };

    return request;
  }

  loadData() {
    this.isLoading = true;
    this.orgService.filterOrgs(this.getRequest()).subscribe((reses: any) => {
      this.orgs = reses.data;
      this.dataSource.data = this.orgs;
      this.totalItemsCount = reses.pagination.totalItemsCount;
      this.isLoading = false;
    });
  }

  pageChanged(event: PageEvent): void {
    this.take = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.skip = this.take * event.pageIndex;
    this.loadData();
  }

  onClear() {
    this.form.reset();

    this.skip = 0;
    this.take = 5;

    this.loadData();
    this.paginator.firstPage();
  }
}