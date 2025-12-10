

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
    private _email = new BehaviorSubject<string | null>(null);
    email$ = this._email.asObservable();


    constructor() {
        const account = this.pca.getActiveAccount();
        this._connected.next(this.pca.getActiveAccount() !== null);
        this._email.next(account?.username ?? null);

        this.pca.addEventCallback((event) => {
            if (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.LOGOUT_SUCCESS) {
                const account = this.pca.getActiveAccount();
                this._connected.next(account !== null);
                this._email.next(account?.username ?? null);
            }
        });
    }
}