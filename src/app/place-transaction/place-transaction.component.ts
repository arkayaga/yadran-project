import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PlaceService } from '../core/place/place.service';
import { PlaceTransactionService } from '../core/place-transaction/place-transaction.service';
import { PlaceTransaction } from '../core/place-transaction/place-transaction.model';
import { MatTableDataSource } from '@angular/material/table';
import { Place } from '../core/place/place.model';
import { MatDialog } from '@angular/material/dialog';
import { DetailsPlaceTransactionComponent } from './details-place-transaction/details-place-transaction.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-place-transaction',
  templateUrl: './place-transaction.component.html',
  styleUrls: ['./place-transaction.component.scss']
})
export class PlaceTransactionComponent implements AfterViewInit {
  places = [];
  placeId: string;
  selectedPlace: Place;
  display: boolean = false;
  details = [];
  displayedColumns: string[] = [
    'name',
    'createdAt',
    'amountPlus',
    'amountMinus',
    'description',
  ];

  dataSource = new MatTableDataSource<PlaceTransaction>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  table = [
    {
      columnDef: 'name',
      header: 'Organizasyon ID',
      cellDef: 'transactionType',
      type: "obj"
    },
    {
      columnDef: 'createdAt',
      header: 'İşlem Tarihi',
      cellDef: 'createdAt',
      type: 'date'
    },
    {
      columnDef: 'amountPlus',
      header: 'Kasaya Giren (TL)',
      cellDef: 'amount',
      type: 'plus'
    },
    {
      columnDef: 'amountMinus',
      header: 'Kasadan Çıkan (TL)',
      cellDef: 'amount',
      type: 'minus'
    },
    {
      columnDef: 'description',
      header: 'Açıklama',
      cellDef: 'description',
      type: 'text'
    },
  ];

  searchField = new FormControl();
  searchValue = '';

  fileName = 'KasaYonetimi-Detay.xlsx';

  constructor(
    private placeService: PlaceService,
    private placeTransaction: PlaceTransactionService,
    public dialog: MatDialog
  ) {
    this.getPlaces();
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

  getPlaces() {
    this.placeService.getPlaces()
      .subscribe(places => {
        this.places = places.data
        this.places.forEach(x => {
          this.getPlaceCashboxAmount(x.id)
        })
      })
  }

  getPlaceCashboxAmount(id) {
    this.placeTransaction.getPlaceCashboxAmount(id)
      .subscribe(
        (x: any) => {
          const index = this.places.findIndex(plc => plc.id === id);
          this.places[index].amount = x.data
        });
  }

  getDetail(place) {
    this.selectedPlace = place
    this.placeTransaction.getPlaceTransactions(place.id)
      .subscribe((x: any) => {
        this.details = x.data;
        this.dataSource.data = this.details;
      })
    this.display = true;
  }

  onSum(place) {
    const dialogRef = this.dialog.open(DetailsPlaceTransactionComponent, {
      data: place.id
    })
    dialogRef.componentInstance.isAdd = true;
    dialogRef.afterClosed().subscribe((x: any) => {
      this.selectedPlace.amount += x
    });
  }

  onMinus(place) {
    const dialogRef = this.dialog.open(DetailsPlaceTransactionComponent, {
      data: place.id,
      // data:
      // {
      //   placeId: place.id,
      //   isAdd: Boolean,
      //   description: String
      // }
    })
    dialogRef.componentInstance.isAdd = false;
    dialogRef.afterClosed().subscribe((x: any) => {
      this.selectedPlace.amount -= x
    });
  }

  exportexcel(): void {
    const element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }
}
