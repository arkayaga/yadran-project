import { Injectable } from "@angular/core";
import { HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { exhaustMap, take } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {
    constructor() { }

    

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        const modifiedReq = req.clone({
            headers: new HttpHeaders()
                .set('Authorization', 'Bearer ' + AuthService.getToken())
        });
        return next.handle(modifiedReq);
       
    }
}