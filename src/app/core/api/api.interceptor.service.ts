import { Injectable } from "@angular/core";
import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "../../auth/auth.service";

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {
    // tslint:disable-next-line:no-empty
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        const modifiedReq = req.clone({
            headers: new HttpHeaders()
                .set('Authorization', 'Bearer ' + AuthService.getToken())
        });
        return next.handle(modifiedReq);
    }
}