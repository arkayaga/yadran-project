import { Component, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '../core/sidenav.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  @ViewChild('drawer', { static: false }) public sidenav: MatSidenav;
  checked: boolean;
  mode: MatDrawerMode = 'side'

  constructor(private sidenavService: SidenavService) {
    this.sidenavService.getValue().subscribe((x: any) => {
      this.checked = x;
      if (this.checked) {
        this.mode = 'side'
      }
      // else {
      //   this.mode = 'over'
      // }
    })

  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  mouseover(event: MouseEvent) {
    // console.log(event.type)
    if (this.checked === false) {
      if (event.type === 'mouseover') {
        this.mode = 'over'
      }
    }
  };

  mouseout(event: MouseEvent) {
    // console.log(event)
    if (this.checked === false) {
      if (event.type === 'mouseout') {
        this.mode = 'side'
      }
    }
  };
}
