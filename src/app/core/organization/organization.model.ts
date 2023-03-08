import * as moment from "moment";
import { OrganizationCost } from "../../core/organization-cost/organization-cost.model";
import { OrganizationStatus } from "../../core/organization-status/organization-status.model";
import { OrganizationType } from "../../core/organization-type/organization-type.model";
import { Place } from "../../core/place/place.model";

export interface Organization {
    id: string;
    updatedAt?: string;
    createdAt?: string;
    placeId: string;
    organizationStatusId: string;
    organizationTypeId: string;
    reservationTypeId: string;
    managingUserId?: string;
    contractTextId?: string;
    transactionDate: string;
    plannedPeopleNumber: number;
    realizedPeopleNumber?: number;
    identityNumber: string;
    emailAddress: string;
    address: string;
    technicalEquipment: string;
    code?: string;
    contractAmount: number;
    downPayment: number;
    income?: number;
    expense?: number;
    profit?: number;
    contractDate: string;
    customerFullName: string;
    customerMobilePhone: string;
    contactPersonFullName: string;
    contactPersonMobilePhone: string;
    notes: string;
    specialRequests: string;
    organizationStartDate: string;
    organizationEndDate: string;
    treats: string;
    paymentNote: string;
    managingUser?: any;
    organizationStatus?: OrganizationStatus;
    organizationType?: OrganizationType;
    place?: Place;
    organizationOrganizationCostRecipes?: OrganizationCost;
}


export interface OrganizationFilter{
    beginDate?: moment.Moment,
    endDate?: moment.Moment,
    placeIds?: Place,
    organizationStatusId?: string,
    skip?: number,
    take?: number,
    orderBy?: string,
    orderType?: string,
    search?: string
  }