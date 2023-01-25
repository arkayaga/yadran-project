import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Place } from '../core/place/place.model';
import Swal from 'sweetalert2';
import { PlaceService } from '../core/place/place.service';
import { PlaceDetailsComponent } from './place-details/place-details.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss']
})
export class PlaceListComponent implements AfterViewInit {
  places = [];
  displayedColumns: string[] = ['name', 'button'];
  dataSource = new MatTableDataSource<Place>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private placeService: PlaceService,
    public dialog: MatDialog
  ) {
    this.getlist()
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
    this.placeService.getPlaces()
      .subscribe(
        places => {
          this.places = places.data;
          this.dataSource.data = this.places;
        });
  }

  onNew() {
    // this.router.navigate(['place-list/new']);
    this.dialog.open(PlaceDetailsComponent)
  }


  onEdit(place) {
    const dialogRef = this.dialog.open(PlaceDetailsComponent,
      {
        width: '40vw',
        data: place.id
      });
    dialogRef.afterClosed().subscribe(() => {
      this.getlist();
    });

    // console.log(place)
    // this.router.navigate(['place-list/' + place.id])
  }

  onDelete(place) {
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
          this.placeService.deletePlace(place.id).subscribe(res => {
            if (res === place.id) {
              this.places.splice(place.id, 1);
            }
            Swal.fire('Silindi!', '', 'success')
            this.getlist()
          });
        } else if (result.isDenied) {
          Swal.fire('Vazgecildi', '', 'info')
        }
      })
  };
}


