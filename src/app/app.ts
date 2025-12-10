import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterOutlet, RouterModule } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './shared/modules/materialModule';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalModule, MsalService } from '@azure/msal-angular';
import { ClaimService } from './core/services/claim.service';
import { filter, Subject, takeUntil } from 'rxjs';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, PopupRequest } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatProgressSpinner, CommonModule, RouterModule, MaterialModule, MsalModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private msalGuardConfig = inject<MsalGuardConfiguration>(MSAL_GUARD_CONFIG);
  protected readonly title = signal('reprise-front');
  loading = false;
  isConnected$: any;

  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();
  claimsFromApi: any;
  apiResult = '';

  constructor(private router: Router, private msalService: MsalService,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private claimService: ClaimService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loading = false;
      }

      this.isConnected$ = this.claimService.connected$;
      // this.initMsal();
    });
  }

  ngOnInit(): void {
    this.authService.handleRedirectObservable().subscribe();

    this.setLoginDisplay();

    this.authService.instance.enableAccountStorageEvents();
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
      await this.authService.instance.initialize();
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
  
    logout(popup?: boolean) {
      if (popup) {
        this.authService.logoutPopup({
          mainWindowRedirectUri: '/',
        });
      } else {
        this.authService.logoutRedirect();
      }
    }

  getUserEmail() {
    const account = this.msalService.instance.getActiveAccount();
    return account ? account.username : 'Guest';
  }
}
