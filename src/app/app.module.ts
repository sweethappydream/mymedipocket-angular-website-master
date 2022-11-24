import { Routes, RouterModule } from '@angular/router';
import { MediaComponent } from './media/media.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FindTheComponent } from './find-the/find-the.component';
import { SearchLowestPriceComponent } from './search-lowest-price/search-lowest-price.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DownloadAppComponent } from './download-app/download-app.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(h => h.HomeModule) },
  { path: 'features', loadChildren: () => import('./features/features.module').then(f => f.FeaturesModule) },
  { path: 'about', loadChildren: () => import('./about/about.module').then(a => a.AboutModule) },
  { path: 'partners', loadChildren: () => import('./partners/partners.module').then(a => a.PartnersModule) },
  { path: 'contact', loadChildren: () => import('./contact-us/contact-us.module').then(a => a.ContactUsModule) },
  { path: 'savings', loadChildren: () => import('./saving-steps/saving-steps.module').then(a => a.SavingStepsModule) },
  { path: 'media', component: MediaComponent },
  { path: 'find-the', component: FindTheComponent },
  { path: 'search-lowest-price', component: SearchLowestPriceComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MediaComponent,
    FindTheComponent,
    SearchLowestPriceComponent,
    DownloadAppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
      scrollOffset: [0, 64],
    }),
    BrowserAnimationsModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DownloadAppComponent]
})
export class AppModule {}
