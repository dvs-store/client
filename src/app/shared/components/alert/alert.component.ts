import { Component, input } from '@angular/core';
import { IAlertType } from '../../interfaces/components/IAlertType';

@Component({
  selector: 'alert',
  imports: [],
  templateUrl: './alert.component.html'
})
export class AlertComponent {

  public message = input.required<string>();
  public type = input<IAlertType>('SUCCES');


  protected get getColorAlert():string {
    let color = 'bg-green-500';

    if( this.type() === 'ERROR' ){
      color = 'bg-red-500';
    }else if(this.type() === 'WARNING'){
      color = 'bg-yellow-500';
    }

    return color;
  }

}
