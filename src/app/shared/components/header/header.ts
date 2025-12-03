import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../modules/materialModule';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule,MaterialModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
