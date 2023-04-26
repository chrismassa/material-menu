import { Component } from '@angular/core';
import { bottomNavMenu, menu } from 'src/app/core/config/menu';
import { MenuItem } from 'src/app/core/models/menu-item.model';

@Component({
  selector: 'app-mobile-side-menu',
  templateUrl: './mobile-side-menu.component.html',
  styleUrls: ['./mobile-side-menu.component.scss']
})
export class MobileSideMenuComponent {

  menu: MenuItem[] = menu;
  shortcuts: MenuItem[] = bottomNavMenu;

}
