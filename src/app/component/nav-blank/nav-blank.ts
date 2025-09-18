import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-nav-blank',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.html',
  styleUrl: './nav-blank.css'
})
export class NavBlank {

}
