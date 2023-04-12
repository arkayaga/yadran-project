
export interface PlaceTransaction {
    id: string,
    updatedAt?: string,
    createdAt?: string,
    placeId?: string,
    transactionTypeId?: string,
    amount?: number,
    description?: string,
    transactionType?: {
        id?: string,
        updatedAt?: string,
        createdAt?: string,
        name?: string
      }
}