export interface PlaceRequest {
    id?: string;
    name?: string;
    shortName?: string;
    profitRate?: number;
}

export interface Place {
    id: string;
    name: string;
    shortName: string;
    profitRate: number;
    users: any;
    updatedAt: string;
    createdAt: string;
}