import { Injectable } from "@angular/core";
import { HttpInterceptor , HttpRequest, HttpHandler, HttpEvent} from "@angular/common/http";
import { Observable } from "rxjs";
import { PersistenceService } from "../../shared/services/persistenceService";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private persistenceService: PersistenceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.persistenceService.get('accessToken')
    req = req.clone({
      setHeaders: {
        Authorization: accessToken ? `accessToken ${accessToken}` : ''
      }
    })
    return next.handle(req)
  }
}
