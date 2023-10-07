import { Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { MenuItem } from 'src/app/core/models/menu-item.model';
import { AuthService } from '../../services/auth.service';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-desktop-side-menu',
  templateUrl: './desktop-side-menu.component.html',
  styleUrls: ['./desktop-side-menu.component.scss'],
})
export class DesktopSideMenuComponent implements OnDestroy {

  focused: string | null = null;

  authService = inject(AuthService);

  @ViewChild('drawer') drawer!: MatDrawer;

  drawerMenu: MenuItem[] = [];

  destroyed = new Subject<void>();

  constructor(
    private platform: PlatformService
  ) {
    document.addEventListener('mousemove', e => { this.saveCursorPosition(e.clientX, e.clientY); })
  }

  saveCursorPosition(x: number, y: number) {
    const xPos = (x / window.innerWidth).toFixed(2);
    const yPos = (y / window.innerHeight).toFixed(2);
    console.log(xPos);

    document.documentElement.style.setProperty('--x', xPos);
    document.documentElement.style.setProperty('--y', yPos);
  }

  onDrawerLeave() {
    this.platform.isDesktop$
      .pipe(takeUntil(this.destroyed))
      .subscribe({
        next: (matches) => {
          if (matches) {
            this.drawer.close();
          }
        }
      })
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
