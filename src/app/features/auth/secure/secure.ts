// src/app/secure.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { authConfig } from '../../../shared/env';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Zone sécurisée</h1>
    <button (click)="callSecure()">Appeler API sécurisée</button>
    <pre>{{ secureResult }}</pre>
  `
})
export class SecureComponent {
  private http = inject(HttpClient);
  secureResult = '';

  callSecure() {
    this.http.get(`${authConfig.apiBaseUrl}/secure`, { responseType: 'text' })
      .subscribe(text => this.secureResult = text);
  }
}