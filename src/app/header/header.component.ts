import { DownloadAppComponent } from './../download-app/download-app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, HostListener, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { share, map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @HostListener('click')
  clickInside(event) {
    this.wasInside = true;
  }

  @HostListener('document:click')
  clickout() {
    if (!this.wasInside) {
      this.hideMenu = true;
    }
    this.wasInside = false;
  }

  showBanner: boolean = true;
  hideMenu: boolean = true;
  private wasInside: boolean = false;
  activeFragment: Observable<string>;
  
  constructor(private dialog: MatDialog, private router: ActivatedRoute, private route: Router) {
    this.activeFragment = this.router.fragment.pipe(share());
  }

  openAppDownload() {
    this.dialog.open(DownloadAppComponent, { panelClass: ['cust-dialog'] });
  }

  open(template: TemplateRef<any>) {
    this.dialog.open(template, {
      panelClass: ['small-padding'],
      minWidth: window.innerWidth < 768 ? '90vw' : '65vw'
    });
  }

  goToDeliveryForm() {
    this.hideMenu = true;
    this.route.navigateByUrl('/features')
      .finally(() => {
        const top = document.querySelector('.delivery-form').getBoundingClientRect().top - 50;
        window.scrollTo({top});
      }
    )
  }

}
