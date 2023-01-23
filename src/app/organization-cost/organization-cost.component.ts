import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrganizationCost } from '../core/organization-cost/organization.model';
import { OrganizationCostService } from '../core/organization-cost/organization-cost.service';
import { CostDetailsComponent } from './cost-details/cost-details.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-organization-cost',
  templateUrl: './organization-cost.component.html',
  styleUrls: ['./organization-cost.component.scss'],
})
export class OrganizationCostComponent implements AfterViewInit {
  orgs = [];
  displayedColumns: string[] = ['org', 'button'];
  dataSource = new MatTableDataSource<OrganizationCost>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private router: Router,
    private orgService: OrganizationCostService,
    public dialog: MatDialog) {

    this.getOrgs();

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


  getOrgs() {
    this.orgService.getOrganizations()
      .subscribe(
        orgs => {
          this.orgs = orgs.data
          this.dataSource.data = this.orgs;

        }
      )
  }

  onNew() {
    // this.router.navigate(['organization-cost/new']);
    const dialogRef = this.dialog.open(CostDetailsComponent)

  }

  onEdit(org) {
    const dialogRef = this.dialog.open(CostDetailsComponent,
      {
        width: '40vw',
        data: org.id
      });

    dialogRef.afterClosed().subscribe(result => {
      this.getOrgs();
    });
    // console.log('delete :' + org.id)
    // this.router.navigate(['organization-cost/' + org.id])
  }

  onDelete(org) {
    this.orgService.deleteOrganization(org.id)
      .subscribe(res => {
        if (res === org.id) {
          this.orgs.splice(org.id, 1)
        }
        this.getOrgs()
      })
  }
}


