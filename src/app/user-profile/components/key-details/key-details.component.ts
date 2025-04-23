import { Component, input } from '@angular/core';
import { IKey } from '../../interfaces/IKey';

@Component({
  selector: 'key-details',
  imports: [],
  templateUrl: './key-details.component.html'
})
export class KeyDetailsComponent {

  public key = input.required<IKey>();

}
