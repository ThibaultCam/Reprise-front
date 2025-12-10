import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { MsalService } from '@azure/msal-angular';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../shared/env';

@Injectable()
export class FilmInterceptor implements HttpInterceptor {
  constructor(private msalService: MsalService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (req.url.startsWith(`${environment.adConfig.apiEndpointUrl}/film`)) {
        console.log('FilmInterceptor intercepting request:', req.url);
      const account = this.msalService.instance.getActiveAccount();
      if (account) {
        return from(
          this.msalService.acquireTokenSilent({
            scopes: environment.adConfig.scopeUrls,
            account
          })
        ).pipe(
          switchMap(result => {
            const authReq = req.clone({
              setHeaders: { Authorization: `Bearer ${result.accessToken}` }
            });
            return next.handle(authReq);
          })
        );
      }
    }
    return next.handle(req);
  }
}