import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { bottomNavMenu, menu } from './config/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('drawer') drawer!: MatDrawer;

  menu: MenuItem[] = menu;
  bottomNavMenu: MenuItem[] = bottomNavMenu;
  drawerMenu: MenuItem[] = [];

  destroyed = new Subject<void>();

  isSmallScreen = this.breakpointObserver
    .observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
    ])
    .pipe(takeUntil(this.destroyed));

  constructor(private breakpointObserver: BreakpointObserver) { }

  openMenuFromToggle() {
    // TODO
    this.drawer.toggle();
  }

}

export interface MenuItem {
  name: string;
  icon?: string;
  path?: string;
  subMenu?: MenuItem[];
}