import { Component, input } from '@angular/core';
import { IKey } from '../../interfaces/IKey';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, DatePipe} from '@angular/common';
import { RouterLink } from '@angular/router';
import { CopyContentComponent } from "../../../shared/components/copy-content/copy-content.component";


@Component({
  selector: 'key-details',
  imports: [MatButtonModule, MatIconModule, DatePipe, CurrencyPipe, RouterLink, CopyContentComponent],
  templateUrl: './key-details.component.html'
})
export class KeyDetailsComponent {

  public key = input.required<IKey>();


  constructor(){}

}
