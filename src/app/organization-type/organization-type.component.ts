import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OrganizationType } from '../core/organization-type/organization-type.model';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrganizationTypeService } from '../core/organization-type/organization-type.service';
import { MatDialog } from '@angular/material/dialog';
import { TypeDetailsComponent } from './type-details/type-details.component';

@Component({
  selector: 'app-organization-type',
  templateUrl: './organization-type.component.html',
  styleUrls: ['./organization-type.component.scss']
})
export class OrganizationTypeComponent {
  orgsType = [];
  displayedColumns: string[] = ['name', 'button'];
  dataSource = new MatTableDataSource<OrganizationType>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private orgService: OrganizationTypeService,
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
    this.orgService.getOrgsType()
      .subscribe(
        reses => {
          this.orgsType = reses.data
          this.dataSource.data = this.orgsType;

        }
      )
  }

  onNew() {
    const dialogRef = this.dialog.open(TypeDetailsComponent)

    dialogRef.afterClosed().subscribe(() => {
      this.getlist();
    }
    )
  }

  onEdit(org) {
    const dialogRef = this.dialog.open(TypeDetailsComponent,
      {
        width: '40vw',
        data: org.id
      });

    dialogRef.afterClosed().subscribe(() => {
      this.getlist();
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
          this.orgService.deleteOrgType(org.id).subscribe(() => {

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
