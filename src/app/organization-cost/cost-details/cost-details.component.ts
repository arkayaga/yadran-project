import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizationCostService } from '../../core/organization-cost/organization-cost.service';
import { PlaceService } from '../../core/place/place.service';

@Component({
  selector: 'app-cost-details',
  templateUrl: './cost-details.component.html',
  styleUrls: ['./cost-details.component.scss'],
})
export class CostDetailsComponent {
  form: FormGroup;
  places = [];
  id: string;

  constructor(private placeService: PlaceService,
    private costService: OrganizationCostService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CostDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
  ) {

    this.initForm();
    this.selectPlaces();

    if (this.data && data !== 'new') {
      this.id = data;
      this.getDetail();
    }

    // this.route.params.subscribe(data => {
    //   if (data['id']) {
    //     this.id = data['id'];
    //     this.getDetail();
    //   }
    // })

  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      cost: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      salePrice: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      isPerUser: [false, [Validators.required]],
      isActive: [false, [Validators.required]],
      placeId: [null, [Validators.required]]
    });

  }

  getDetail() {
    this.costService.getOrgCost(this.id)
      .subscribe((res: any) => {
        if (!res.isError) {
          this.form.patchValue({
            name: res.data.name,
            cost: res.data.cost,
            salePrice: res.data.salePrice,
            isPerUser: res.data.isPerUser,
            isActive: res.data.isActive,
            placeId: res.data.placeId,
          });
        }
      });
  }

  getRequest() {
    const value = this.form.value;

    const request = {
      id: this.id,
      name: value?.name,
      cost: value?.cost,
      salePrice: value?.salePrice,
      isPerUser: value?.isPerUser,
      isActive: value?.isActive,
      placeId: value?.placeId
    }

    return request;
  }


  onSave() {
    // const value = this.form.value;
    // console.log(value);

    this.form.markAllAsTouched();
    if (this.form.valid) {

      if (!this.id) {
        this.costService.addOrgCost(this.getRequest()).subscribe(() => {
          // this.router.navigate(['organization-cost'])
          this.dialogRef.close();
        })
      }
      else {
        this.costService.editOrgCost(this.getRequest()).subscribe(() => {
          // this.router.navigate(['organization-cost'])
          this.dialogRef.close();

        })
      }
    }
  }


  selectPlaces() {
    this.placeService.getPlaces().subscribe(
      places => {
        this.places = places.data
      }
    );
  }


}
