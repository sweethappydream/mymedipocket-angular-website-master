import { Router, RouteConfigLoadStart } from '@angular/router';
import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'medipocket';
  loading: boolean

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      this.loading = event instanceof RouteConfigLoadStart;
    });
  }
}
