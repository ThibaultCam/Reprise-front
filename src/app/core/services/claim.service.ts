

import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventType, PublicClientApplication } from '@azure/msal-browser';
import { MSAL_INSTANCE } from '@azure/msal-angular';

@Injectable({
    providedIn: 'root'
})
export class ClaimService {
    private pca = inject<PublicClientApplication>(MSAL_INSTANCE);
    private _connected = new BehaviorSubject<boolean>(false);
    connected$ = this._connected.asObservable();

    constructor() {
        this.pca.initialize().then(() => {
            this._connected.next(this.pca.getActiveAccount() !== null);
        });


        this.pca.addEventCallback((event) => {
            if (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.LOGOUT_SUCCESS) {
                this._connected.next(this.pca.getActiveAccount() != null);
            }
        });
    }
}