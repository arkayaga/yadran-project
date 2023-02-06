import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { OrganizationTypeService } from '../../core/organization-type/organization-type.service';
import { OrganizationStatusService } from '../../core/organization-status/organization-status.service';
import { PlaceService } from '../../core/place/place.service';
import { ReservationTypeService } from '../../core/reservation-type/reservation-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '../../core/organization/organization.service';
import { OrganizationCostService } from '../../core/organization-cost/organization-cost.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss'],
})
export class OrganizationDetailsComponent {
  form: FormGroup;
  id: string;
  places = [];
  orgsStatus = [];
  orgsType = [];
  reses = [];
  costs = [];
  placeId: string;
  date1 = new FormControl(new Date())
  time = ['00:00', '06:00', '12:00', '15:00', '18:00', '21:00'];

  constructor(
    private formBuilder: FormBuilder,
    private placeService: PlaceService,
    private orgStatusService: OrganizationStatusService,
    private orgTypeService: OrganizationTypeService,
    private resService: ReservationTypeService,
    private orgService: OrganizationService,
    private costService: OrganizationCostService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<OrganizationDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private value,
  ) {
    this.initForm();
    this.selectPlaces();
    this.selectOrgsStatus();
    this.selectOrgsType();
    this.selectReses();
    // this.selectCosts();

    this.route.params.subscribe(data => {
      // tslint:disable-next-line:no-string-literal
      if (data['id']) {
        // tslint:disable-next-line:no-string-literal
        this.id = data['id'];
        this.getDetail();
      }
    })

    if (this.value && value !== 'new') {
      this.id = value;
      this.getDetail();
    }

    this.form.get('placeId').valueChanges.subscribe(i => {
      this.getPlaceId(i);
    });

  }

  initForm() {
    this.form = this.formBuilder.group({
      placeId: [null, [Validators.required]],
      organizationStatusId: [null, [Validators.required]],
      organizationTypeId: [null, [Validators.required]],
      transactionDate: { disabled: true, value: null },
      contractDate: [null],
      organizationDate: [null, [Validators.required]],
      reservationTypeId: [null],
      organizationStartDate: [null, [Validators.required]],
      organizationEndDate: [null, [Validators.required]],
      plannedPeopleNumber: [null, [Validators.required]],
      realizedPeopleNumber: [null],
      managingUser: ['admin'],
      identityNumber: [null, [Validators.required]],
      customerFullName: [null, [Validators.required]],
      customerMobilePhone: [null, [Validators.required]],
      emailAddress: [null, [Validators.required]],
      contactPersonFullName: [null, [Validators.required]],
      contactPersonMobilePhone: [null, [Validators.required]],
      address: [null],
      notes: [null],
      treats: [null],
      technicalEquipment: [null],
      specialRequests: [null],
      paymentNote: [null],
      contractAmount: [null],
      downPayment: [null],
      organizationOrganizationCostRecipes: [null],


      // cost: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      // salePrice: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
    });
  }

  getDetail() {
    this.orgService.getOrg(this.id)
      .subscribe((res: any) => {
        if (!res.isError) {
          this.form.patchValue({
            placeId: res.data.placeId,
            organizationStatusId: res.data.organizationStatusId,
            organizationTypeId: res.data.organizationTypeId,
            transactionDate: res.data.transactionDate,
            contractDate: res.data.contractDate,
            organizationDate: res.data.organizationDate,
            reservationTypeId: res.data.reservationTypeId,
            organizationStartDate: res.data.organizationStartDate,
            organizationEndDate: res.data.organizationEndDate,
            plannedPeopleNumber: res.data.plannedPeopleNumber,
            realizedPeopleNumber: res.data.realizedPeopleNumber,
            // managingUser: res.data.managingUser,
            identityNumber: res.data.identityNumber,
            customerFullName: res.data.customerFullName,
            customerMobilePhone: res.data.customerMobilePhone,
            emailAddress: res.data.emailAddress,
            contactPersonFullName: res.data.contactPersonFullName,
            contactPersonMobilePhone: res.data.contactPersonMobilePhone,
            address: res.data.address,
            notes: res.data.notes,
            treats: res.data.treats,
            technicalEquipment: res.data.technicalEquipment,
            specialRequests: res.data.specialRequests,
            paymentNote: res.data.paymentNote,
            contractAmount: res.data.contractAmount,
            downPayment: res.data.downPayment,
            organizationOrganizationCostRecipes: res.data.organizationOrganizationCostRecipes.map(item => item.organizationCostRecipeId),
          });
        }
      });
  }

  getRequest() {
    const value = this.form.value;

    const request = {
      id: this.id,
      placeId: value?.placeId,
      place: value?.place,
      organizationStatusId: value?.organizationStatusId,
      organizationType: value?.organizationType,
      organizationTypeId: value?.organizationTypeId,
      organizationDate: value?.organizationDate,
      reservationTypeId: value?.reservationTypeId,
      organizationStartDate: value?.organizationStartDate,
      organizationEndDate: value?.organizationEndDate,
      plannedPeopleNumber: value?.plannedPeopleNumber,
      realizedPeopleNumber: value?.plannedPeopleNumber,
      managingUser: value?.managingUser,
      managingUserId: value?.managingUserId,
      identityNumber: value?.identityNumber,
      customerFullName: value?.customerFullName,
      customerMobilePhone: value?.customerMobilePhone,
      emailAddress: value?.emailAddress,
      contactPersonFullName: value?.contactPersonFullName,
      contactPersonMobilePhone: value?.contactPersonMobilePhone,
      transactionDate: value?.transactionDate,
      contractDate: value?.contractDate,
      address: value?.address,
      notes: value?.notes,
      treats: value?.treats,
      technicalEquipment: value?.technicalEquipment,
      specialRequests: value?.specialRequests,
      paymentNote: value?.paymentNote,
      contractAmount: value?.contractAmount,
      downPayment: value?.downPayment,
      organizationOrganizationCostRecipes: value?.organizationOrganizationCostRecipes,
      costRecipeReports: value?.costRecipeReports,
      organizationTransactions: value?.organizationTransactions,
      contractTextId: value?.contractTextId,
      updatedAt: value?.updatedAt,
      createdAt: value?.createdAt,
      code: value?.code,
      income: value?.income,
      expense: value?.expense,
      profit: value?.profit,
    }

    return request;
  }

  onSave() {
    this.form.markAllAsTouched();
    if (this.form.valid) {

      if (!this.id) {
        this.orgService.addOrg(this.getRequest()).subscribe(() => {
          this.router.navigate(['organization'])
        })
      }
      else {
        this.orgService.editOrg(this.getRequest()).subscribe(() => {
          this.router.navigate(['organization'])

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

  selectOrgsStatus() {
    this.orgStatusService.getOrgsStatus().subscribe(
      orgsStatus => {
        this.orgsStatus = orgsStatus.data
      }
    );
  }

  selectOrgsType() {
    this.orgTypeService.getOrgsType().subscribe(
      orgsType => {
        this.orgsType = orgsType.data
      }
    );
  }

  selectReses() {
    this.resService.getResesType().subscribe(
      reses => {
        this.reses = reses.data
      }
    );
  }

  // selectCosts() {
  //   this.costService.getOrgCostActive(this.placeId).subscribe(
  //     (costs: any) => {
  //       // tslint:disable-next-line:no-console
  //       console.log(costs)
  //       this.costs = costs.data
  //     }
  //   );
  // }

  getPlaceId(placeId) {
    // tslint:disable-next-line:no-console
    console.log('Place Id:', placeId);
    this.costService.getOrgCostActive(placeId).subscribe(
      (costs: any) => {
        // tslint:disable-next-line:no-console
        console.log(costs)
        this.costs = costs.data
      }
    );
  }
}
