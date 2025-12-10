import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';
import { authConfig } from '../../shared/env';
import { from, catchError, mergeMap, of } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const msal = inject(MsalService);

  // Récupère le compte actif
  const account = msal.instance.getActiveAccount() ?? msal.instance.getAllAccounts()[0];
  if (!account) {
    return next(req); // pas connecté → requête sans token
  }

  // Demande un token silencieusement
  return from(
    msal.instance.acquireTokenSilent({
      account,
      scopes: [authConfig.apiScope]
    })
  ).pipe(
    mergeMap((result) => {
      // Clone la requête avec le header Authorization
      const clonedReq = req.clone({
        setHeaders: { Authorization: `Bearer ${result.accessToken}` }
      });
      return next(clonedReq);
    }),
    catchError((e) => {
      console.error('Token acquisition failed', e);
      return next(req);
    })
  );
};