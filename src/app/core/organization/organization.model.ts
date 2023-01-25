
export interface Organization {
    id: string;
    updatedAt?: string;
    createdAt?: string;
    placeId: string;
    organizationStatusId: string;
    organizationTypeId: string;
    reservationTypeId: string;
    managingUserId: string;
    contractTextId: string;
    transactionDate: string;
    plannedPeopleNumber: number;
    realizedPeopleNumber: number;
    identityNumber: string;
    emailAddress: string;
    address: string;
    technicalEquipment: string;
    code: string;
    contractAmount: number;
    downPayment: number;
    income: number;
    expense: number;
    profit: number;
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
}