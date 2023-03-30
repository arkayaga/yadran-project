import { Place } from "../../core/place/place.model"
import { User } from "../../core/user/user.model"

export interface PlaceTransactionRequest {
    id: string,
    updatedAt?: string,
    createdAt?: string,
    userId?: string,
    placeId: string,
    amount: number,
    description: string,
    isConfirm?: boolean,
    safeName?: string,
    fileName?: string,
    place?: Place,
    user?: User
}