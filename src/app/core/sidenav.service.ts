import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private sidenav: MatSidenav;
  private checked: BehaviorSubject<boolean>;

  constructor() {
    this.checked = new BehaviorSubject<boolean>(true);
  }

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public toggle(): void {
    this.sidenav.toggle();
  }

  getValue(): Observable<boolean> {
    return this.checked.asObservable();
  }

  setValue(newValue): void {
    this.checked.next(newValue);
  }

  // closeSidenav() {
  //   this.checked.next(false);
  // }

}
