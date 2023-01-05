import { Place } from "../place/place.model";

export interface OrganizationCost {
    id?: string;
    updatedAt?: string;
    createdAt?: string;
    name: string;
    cost: number;
    salePrice: number;
    isPerUser: boolean;
    isActive: boolean;
    placeId: string;
    place?: Place
}