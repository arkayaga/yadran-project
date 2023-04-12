import { Component } from '@angular/core';
import { PlaceService } from '../core/place/place.service';
import { PlaceTransactionService } from '../core/place-transaction/place-transaction.service';
import { PlaceTransaction } from '../core/place-transaction/place-transaction.model';
import { MatTableDataSource } from '@angular/material/table';
import { Place } from '../core/place/place.model';

@Component({
  selector: 'app-place-transaction',
  templateUrl: './place-transaction.component.html',
  styleUrls: ['./place-transaction.component.scss']
})
export class PlaceTransactionComponent {
  places = [];
  placeId: string;
  cashboxAmount: number;
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

  constructor(
    private placeService: PlaceService,
    private placeTransaction: PlaceTransactionService,
    // public dialog: MatDialog
  ) {
    this.getPlaces();
    // this.getPlaceCashboxAmount();
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
          console.log(x)
          const index = this.places.findIndex(plc => plc.id === id);
          this.places[index].amount = x.data
        });
  }

  getDetail(place) {
    this.selectedPlace = place
    this.placeTransaction.getPlaceTransactions(place.id)
      .subscribe((x: any) => {
        console.log(x)
        this.details = x.data;
        this.dataSource.data = this.details;
      })
    this.display = true;
  }
}
