import { Component, inject, input, PLATFORM_ID } from '@angular/core';
import { IKey } from '../../interfaces/IKey';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'key-details',
  imports: [MatButtonModule, MatIconModule, DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './key-details.component.html'
})
export class KeyDetailsComponent {

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  public key = input.required<IKey>();
  private snackBar = inject(MatSnackBar);


  protected copyKeyToClipboard(){
    if( this.isBrowser ){
      navigator.clipboard.writeText(this.key().key.trim())
        .then(() => {
          this.snackBar.open('Key copied to clipboard!', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
        });
    }
  }

}
