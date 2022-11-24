import { DownloadAppComponent } from './../download-app/download-app.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private dialog: MatDialog) {}

  open() {
    this.dialog.open(DownloadAppComponent, { panelClass: ['cust-dialog', 'dialog-top'] });
  }
}
