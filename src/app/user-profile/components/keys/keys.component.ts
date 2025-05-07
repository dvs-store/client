import { Component, OnInit, signal } from '@angular/core';
import { IKey } from '../../interfaces/IKey';
import { KeysService } from '../../services/keys.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { KeyDetailsComponent } from "../key-details/key-details.component";
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'keys',
  imports: [MatProgressSpinnerModule, KeyDetailsComponent, RouterLink, MatButtonModule],
  templateUrl: './keys.component.html'
})
export class KeysComponent implements OnInit {

  protected keys = signal<null | IKey[]>(null);

  constructor(
    private keysService:KeysService,
  ){}


  ngOnInit(): void {
    this.getKeys();
  }


  private getKeys(){
    this.keysService.getKeys()
      .subscribe((keys) => {
        this.keys.set(keys)
      });
  }

}
