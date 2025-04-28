import { Component, inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ProfileImageComponent } from "../profile-image/profile-image.component";
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { NavbarSkeletonComponent } from "../navbar-skeleton/navbar-skeleton.component";
import { ShoppService } from '../../../store/shopp/services/shopp.service';
import {MatBadgeModule} from '@angular/material/badge';


@Component({
  selector: 'navbar',
  imports: [RouterLink, MatButtonModule, MatMenuModule, ProfileImageComponent, MatIconModule, NavbarSkeletonComponent, NgClass, MatBadgeModule, RouterOutlet],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  protected authService:AuthService = inject(AuthService);
  protected shoppService:ShoppService = inject(ShoppService);
  private platformId = inject(PLATFORM_ID);
  protected isBrowser = isPlatformBrowser(this.platformId);

  protected logout(){
    this.authService.logout();
  }

  protected login(){
    this.authService.login();
  }

}
