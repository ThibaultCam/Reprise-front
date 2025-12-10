// src/app/auth-callback.component.ts
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  standalone: true,
  template: `<p>Redirection...</p>`
})
export class AuthCallbackComponent implements OnInit {
  constructor(private msal: MsalService) {}
  ngOnInit() {
  }
}