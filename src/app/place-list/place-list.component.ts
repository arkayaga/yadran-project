import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PlaceService } from '../core/place/place.service';

@Component({
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss']
})
export class PlaceListComponent implements OnInit {
  places = [];
  searchedInput = '';

  constructor(private placeService: PlaceService,
    private router: Router) { }

  ngOnInit(): void {
    this.getlist()
  }

  getlist() {
    this.placeService.getPlaces().subscribe(places => {
      this.places = places.data;
    });
  }

  onNew() {
    this.router.navigate(['place-list/new']);
  }


  onEdit(place) {
    console.log(place)
    this.router.navigate(['place-list/' + place.id]);
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
              this.places.splice(place.id, 1)
            }
            Swal.fire('Silindi!', '', 'success')
            this.getlist()
          });
        } else if (result.isDenied) {
          Swal.fire('Vazgecildi', '', 'info')
        }
      })
  }
}


