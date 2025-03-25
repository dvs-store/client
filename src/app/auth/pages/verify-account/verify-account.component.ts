import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';


@Component({
  selector: 'app-verify-account',
  imports: [],
  templateUrl: './verify-account.component.html'
})
export default class VerifyAccountComponent implements OnInit {

  private router = inject(ActivatedRoute);
  protected token = signal<string | null>(null);


  ngOnInit(): void {
    this.router.params
    .pipe(
      map((params) => params['token']),
      tap(token => console.log(token),
      )
    )
    .subscribe(token => {
      this.token.set(token);
    })
;
  }


}
