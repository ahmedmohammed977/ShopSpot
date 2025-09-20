import { Component, AfterViewInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

declare var bootstrap: any; 

@Component({
  selector: 'app-nav-auth',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-auth.html',
  styleUrls: ['./nav-auth.css']
})
export class NavAuth implements AfterViewInit {

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
