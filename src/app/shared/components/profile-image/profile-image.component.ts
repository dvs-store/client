import { Component, input } from '@angular/core';

@Component({
  selector: 'profile-image',
  imports: [],
  templateUrl: './profile-image.component.html'
})
export class ProfileImageComponent {

  public imageUrl = input<string | null>();

}
