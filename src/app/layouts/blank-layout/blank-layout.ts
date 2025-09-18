import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBlank } from '../../component/nav-blank/nav-blank';
import { Footer } from '../../component/footer/footer';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBlank, Footer],
  templateUrl: './blank-layout.html',
  styleUrl: './blank-layout.css'
})
export class BlankLayout {

}
