import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Link } from '../../models/link';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  @Input()
  title!:string;

  @Input()
  links?:Link[];
}
