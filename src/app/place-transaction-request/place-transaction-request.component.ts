import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PlaceTransactionRequestService } from '../core/place-transaction-request/place-transaction-request.service';
import { PlaceTransactionRequest } from '../core/place-transaction-request/place-transaction-request.model';
import { MatDialog } from '@angular/material/dialog';
import { DetailsPlaceTransactionRequestComponent } from './details-place-transaction-request/details-place-transaction-request.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-place-transaction-request',
  templateUrl: './place-transaction-request.component.html',
  styleUrls: ['./place-transaction-request.component.scss']
})
export class PlaceTransactionRequestComponent {
  requests = [];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns: string[] = [
    'description',
    'createdAt',
    'user',
    'amount',
    'isConfirm',
    'button'
  ];
  isConfirm: boolean = true;

  dataSource = new MatTableDataSource<PlaceTransactionRequest>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  searchField = new FormControl();
  searchValue = '';

  constructor(
    private placeTRService: PlaceTransactionRequestService,
    public dialog: MatDialog
  ) {
    this.loadData();
  }

  table = [
    {
      columnDef: 'description',
      header: 'Açıklama',
      cellDef: 'description',
      type: "text"
    },
    {
      columnDef: 'createdAt',
      header: 'Talep Tarihi',
      cellDef: 'createdAt',
      type: 'date'
    },
    {
      columnDef: 'user',
      header: 'Talep Eden',
      cellDef: 'user',
      type: 'user'
    },
    {
      columnDef: 'amount',
      header: 'Miktar',
      cellDef: 'amount',
      type: 'text'
    },
    {
      columnDef: 'isConfirm',
      header: 'Durum',
      cellDef: 'isConfirm',
      type: 'boolean'
    },
  ];

  loadData() {
    this.placeTRService.getPlaceTransactionRequests().subscribe(res => {
      this.requests = res.data;
      this.dataSource.data = this.requests;
    });
  }

  openDialog(req) {
    this.dialog.open(DetailsPlaceTransactionRequestComponent, {
      data: req.id
    })
  }

  onAdd() {
    const dialogRef = this.dialog.open(DetailsPlaceTransactionRequestComponent)
    dialogRef.afterClosed().subscribe(() => this.loadData());
  }

  onConfirm(req) {
    this.placeTRService.approvePlaceTransactionRequest(req.id).subscribe(() => this.loadData())
  }

  onDelete(req) {
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
        this.placeTRService.deletePlaceTransactionRequest(req.id).subscribe(() => {
          Swal.fire('Silindi!', '', 'success');
          this.loadData();
        });
      } else {
        Swal.fire('Vazgecildi', '', 'info');
      }
    });
  }

  getConfirm() {
    this.placeTRService.getPlaceTransactionRequests().subscribe(res => {
      const data = res.data
      data.forEach(x => {
        console.log(x.isConfirm)
      })
    })
  }
}
