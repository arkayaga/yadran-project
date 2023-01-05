import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastr: ToastrService) { }
  successMsg(title: string, desc: string) {
    console.log(title)
    Swal.fire(title, desc,'success');
  }


  errorMsg(message: string) {
    this.toastr.error(message);
  }
}
