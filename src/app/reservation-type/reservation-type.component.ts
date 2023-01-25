import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ReservationTypeService } from '../core/reservation-type/reservation-type.service';
import { Reservation } from '../core/reservation-type/reservation.model';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';

@Component({
  selector: 'app-reservation-type',
  templateUrl: './reservation-type.component.html',
  styleUrls: ['./reservation-type.component.scss']
})
export class ReservationTypeComponent implements AfterViewInit {
  resesType = [];
  displayedColumns: string[] = ['name', 'button'];
  dataSource = new MatTableDataSource<Reservation>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private resService: ReservationTypeService,
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
    this.resService.getResesType()
      .subscribe(
        reses => {
          this.resesType = reses.data
          this.dataSource.data = this.resesType;

        }
      )
  }

  onNew() {
    const dialogRef = this.dialog.open(ReservationDetailsComponent)
    dialogRef.afterClosed().subscribe(() => {
      this.getlist();
    })
  }

  onEdit(res) {
    const dialogRef = this.dialog.open(ReservationDetailsComponent,
      {
        width: '40vw',
        data: res.id
      });

    dialogRef.afterClosed().subscribe(() => {
      this.getlist();
    });
  }

  onDelete(res) {
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
          this.resService.deleteResType(res.id).subscribe(() => {

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
