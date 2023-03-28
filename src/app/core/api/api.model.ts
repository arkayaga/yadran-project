export interface Response<T> {
    statusCode: number;
    message: string;
    isError: boolean;
    data: T;
}