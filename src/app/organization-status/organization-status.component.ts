import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OrganizationStatus } from '../core/organization-status/organization-status.model';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrganizationStatusService } from '../core/organization-status/organization-status.service';
import { MatDialog } from '@angular/material/dialog';
import { StatusDetailsComponent } from './status-details/status-details.component';

@Component({
  selector: 'app-organization-status',
  templateUrl: './organization-status.component.html',
  styleUrls: ['./organization-status.component.scss']
})
export class OrganizationStatusComponent {
  orgsType = [];
  displayedColumns: string[] = ['name', 'button'];
  dataSource = new MatTableDataSource<OrganizationStatus>();
  dialogRef;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private orgService: OrganizationStatusService,
    public dialog: MatDialog) {
    this.getlist();
  }

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
    this.orgService.getOrgsStatus()
      .subscribe(
        reses => {
          this.orgsType = reses.data
          this.dataSource.data = this.orgsType;
        }
      )
  }

  onNew() {
    this.dialogRef = this.dialog.open(StatusDetailsComponent)
    this.dialogRef.afterClosed().subscribe(result => {
      alert(result)
      this.getlist()
    });
  }

  onEdit(org) {
    this.dialogRef = this.dialog.open(StatusDetailsComponent,
      {
        width: '40vw',
        data: org.id
      });

    this.dialogRef.afterClosed().subscribe(() => {
      this.getlist()
    });
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
      cancelButtonText: 'Vazgec!'
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.orgService.deleteOrgStatus(org.id).subscribe(() => {

            Swal.fire('Silindi!', '', 'success')
            this.getlist()
          });
        }
        else {
          Swal.fire('Vazgecildi', '', 'info')
        }
      })
  };
}
