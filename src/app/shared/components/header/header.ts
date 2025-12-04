import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../modules/materialModule';
import { MatTabNavPanel } from '@angular/material/tabs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements AfterViewInit{
  @Input() tabPanel!: MatTabNavPanel;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

}
