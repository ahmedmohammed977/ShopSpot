import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

declare var bootstrap: any; 

@Component({
  selector: 'app-nav-blank',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.html',
  styleUrls: ['./nav-blank.css']
})
export class NavBlank implements AfterViewInit {

  ngAfterViewInit(): void {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.getElementById('navbarSupportedContent');

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarCollapse?.classList.contains('show')) {
          new bootstrap.Collapse(navbarCollapse).toggle();
        }
      });
    });
  }

}
