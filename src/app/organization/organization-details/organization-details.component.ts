import { Component, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { OrganizationTypeService } from '../../core/organization-type/organization-type.service';
import { OrganizationStatusService } from '../../core/organization-status/organization-status.service';
import { PlaceService } from '../../core/place/place.service';
import { ReservationTypeService } from '../../core/reservation-type/reservation-type.service';
import { Router } from '@angular/router';
import { OrganizationService } from '../../core/organization/organization.service';
import { OrganizationCostService } from '../../core/organization-cost/organization-cost.service';
import * as moment from 'moment';
import { AuthService } from '../../auth/auth.service';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss'],
})
export class OrganizationDetailsComponent {
  form: FormGroup;
  user: any
  places = [];
  orgsStatus = [];
  orgsType = [];
  reses = [];
  costs = [];
  placeId: string;
  date1 = new FormControl(new Date())
  time = [];

  @Input()
  get organization() { return this._organization; }
  set organization(organization: any) {
    this._organization = organization;

    if (organization) {
      this.setForm();
    }
  }
  private _organization;

  constructor(
    private formBuilder: FormBuilder,
    private placeService: PlaceService,
    private orgStatusService: OrganizationStatusService,
    private orgTypeService: OrganizationTypeService,
    private resService: ReservationTypeService,
    private orgService: OrganizationService,
    private costService: OrganizationCostService,
    private router: Router,
    private auth: AuthService
  ) {
    this.initForm();
    this.selectPlaces();
    this.selectOrgsStatus();
    this.selectOrgsType();
    this.selectReses();
    this.createTime();
    // this.getUsername();

    this.form.get('placeId').valueChanges.subscribe(i => {
      this.getPlaceId(i);
    });

  }

  createTime() {
    this.time = Array.from({
      length: 48
    }, (_, hour) => moment({
      hour: Math.floor(hour / 2),
      minutes: (hour % 2 === 0 ? 0 : 30)
    })
    );
    // moment.parseZone(this.time).utcOffset();
    // moment().utcOffset();
    // moment(this.time.toString(), "LT").format('HH:mm');
  }


  initForm() {
    this.form = this.formBuilder.group({
      placeId: [null, [Validators.required]],
      organizationStatusId: [null, [Validators.required]],
      organizationTypeId: [null, [Validators.required]],
      transactionDate: { disabled: true, value: null },
      contractDate: [null],
      reservationTypeId: [null],
      organizationStartDate: [null, [Validators.required]],
      organizationEndDate: [null, [Validators.required]],
      plannedPeopleNumber: [null, [Validators.required]],
      realizedPeopleNumber: [null],
      managingUser: [this.getUser()],
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

  setForm() {
    this.form.patchValue({
      placeId: this.organization.placeId,
      organizationStatusId: this.organization.organizationStatusId,
      organizationTypeId: this.organization.organizationTypeId,
      transactionDate: this.organization.transactionDate,
      contractDate: this.organization.contractDate,
      reservationTypeId: this.organization.reservationTypeId,
      organizationStartDate: this.organization.organizationStartDate,
      organizationEndDate: this.organization.organizationEndDate,
      plannedPeopleNumber: this.organization.plannedPeopleNumber,
      realizedPeopleNumber: this.organization.realizedPeopleNumber,
      managingUser: this.organization.managingUser,
      // managingUserId: this.organization.managingUser.id,
      identityNumber: this.organization.identityNumber,
      customerFullName: this.organization.customerFullName,
      customerMobilePhone: this.organization.customerMobilePhone,
      emailAddress: this.organization.emailAddress,
      contactPersonFullName: this.organization.contactPersonFullName,
      contactPersonMobilePhone: this.organization.contactPersonMobilePhone,
      address: this.organization.address,
      notes: this.organization.notes,
      treats: this.organization.treats,
      technicalEquipment: this.organization.technicalEquipment,
      specialRequests: this.organization.specialRequests,
      paymentNote: this.organization.paymentNote,
      contractAmount: this.organization.contractAmount,
      downPayment: this.organization.downPayment,
      contractTextId: this.organization.contractTextId,
      income: this.organization.income,
      expense: this.organization.expense,
      organizationOrganizationCostRecipes: this.organization.organizationOrganizationCostRecipes.map(
        item => item.organizationCostRecipeId),
    });
  }

  getRequest() {
    const value = this.form.value;

    const request = {
      id: this.organization ? this.organization.id : null,
      placeId: value?.placeId,
      place: value?.place,
      organizationStatusId: value?.organizationStatusId,
      organizationType: value?.organizationType,
      organizationTypeId: value?.organizationTypeId,
      reservationTypeId: value?.reservationTypeId,
      organizationStartDate: value?.organizationStartDate,
      organizationEndDate: value?.organizationEndDate,
      plannedPeopleNumber: value?.plannedPeopleNumber,
      realizedPeopleNumber: value?.plannedPeopleNumber,
      managingUser: value?.managingUser,
      managingUserId: value?.managingUser.id,
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

      if (this.organization) {
        this.orgService.editOrg(this.getRequest()).subscribe(() => {
          this.router.navigate(['organization'])
        })
      } else {
        this.orgService.addOrg(this.getRequest()).subscribe(() => {
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

  getUser() {
    this.auth.getUser().subscribe(user => {
      this.user = user
    });
  }
}
