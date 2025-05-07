import { isPlatformBrowser } from '@angular/common';
import { Component, inject, input, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'copy-content',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './copy-content.component.html'
})
export class CopyContentComponent {

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  public data = input.required<{title:string, content: string}>();
  private snackBar = inject(MatSnackBar);

  protected copyKeyToClipboard(){
    if( this.isBrowser ){
      navigator.clipboard.writeText(this.data().content.trim())
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
