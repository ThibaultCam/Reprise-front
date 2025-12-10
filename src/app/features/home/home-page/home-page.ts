import { Component, inject, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG, MsalModule, MsalBroadcastService } from "@azure/msal-angular";
import { authConfig } from "../../../shared/env";
import { filter, finalize, takeUntil } from "rxjs/operators";
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, PopupRequest } from "@azure/msal-browser";
import { RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Subject } from "rxjs";

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, MsalModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private http = inject(HttpClient);
  private msal = inject(MsalService);
  private msalGuardConfig = inject<MsalGuardConfiguration>(MSAL_GUARD_CONFIG);
  private interactionInProgress = false;

  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();
  claimsFromApi: any;
  apiResult = '';

  constructor(private msalService: MsalService,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,) {
    this.initMsal();
  }

  ngOnInit(): void {
    this.authService.handleRedirectObservable().subscribe();
    this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal

    this.setLoginDisplay();

    this.authService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.ACCOUNT_ADDED ||
            msg.eventType === EventType.ACCOUNT_REMOVED
        )
      )
      .subscribe((result: EventMessage) => {
        if (this.authService.instance.getAllAccounts().length === 0) {
          window.location.pathname = '/';
        } else {
          this.setLoginDisplay();
        }
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  checkAndSetActiveAccount() {
    let activeAccount = this.authService.instance.getActiveAccount();

    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  async initMsal() {
    await this.msalService.instance.initialize();
  }

  loginPopup() {
    if (this.msalGuardConfig.authRequest) {
      this.authService
        .loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
        });
    } else {
      this.authService
        .loginPopup()
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
        });
    }
  }
  getCaca() {
    console.log(this.authService.instance.getActiveAccount());
  }

  logout(popup?: boolean) {
    if (popup) {
      this.authService.logoutPopup({
        mainWindowRedirectUri: '/',
      });
    } else {
      this.authService.logoutRedirect();
    }
  }

  callApi() {
    this.http.get(`${authConfig.apiBaseUrl}/ping`, { responseType: 'text' })
      .subscribe(text => this.apiResult = text);
  }
}

