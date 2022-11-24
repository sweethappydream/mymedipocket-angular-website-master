import { DownloadAppComponent } from './../../download-app/download-app.component';
import { Component, AfterViewInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  name: any;
  city: any;
  email: any;
  message: any;

  slides = [
    {
      text: 'MediPocket is a blessing for me. Since the day, I have installed this app on my phone;' +
        ' I never paid out of pocket for any of my prescription medications. It has saved me hundreds ' +
        'of dollars on prescription medication over the months. Recently, I saved $400 at the Walgreens' +
        ' pharmacy on medication.' ,
      name: 'George Peterson, CA' ,
      stars: 3
    },
    {
      text: 'It’s a great app as it has helped me find cheaper prices. Since I am on disability, thus every bit' +
        ' counts. Nothing can be much better if you could save on your favorite pharmacies.' ,
      name: 'Carl Mullet, FL' ,
      stars: 4
    },
    {
      text: 'I took my dog to the vet for his annual checkup, and the Vet prescribed him 42 tablets' +
        ' of Cephalexin 500mg, 21 tablets of Enalapril 5mg, and 60 tablets of Levothyroxine 25mcg.' +
        ' The Vet charged $32.58 for the Cephalexin, $23.76 for the Enalapril, and $68.72 for the Levothyroxine.' +
        ' With my MediPocket card, I paid $15.71 for the Cephalexin, $14.62 for the Enalapril, ' +
        'and $14.03 for the Levothyroxine. I saved $80.70 total, thank you MediPocket!' ,
      stars: 4,
      name: 'Kristin, Lindenwold, NJ'
    },
    {
      text: 'MediPocket is a blessing for me. Since the day, I have installed this app on my phone;' +
        ' I never paid out of pocket for any of my prescription medications. It has saved me hundreds ' +
        'of dollars on prescription medication over the months. Recently, I saved $400 at the Walgreens' +
        ' pharmacy on medication.' ,
      name: 'George Peterson, CA' ,
      stars: 3
    },
    {
      text: 'It’s a great app as it has helped me find cheaper prices. Since I am on disability, thus every bit' +
        ' counts. Nothing can be much better if you could save on your favorite pharmacies.' ,
      name: 'Carl Mullet, FL' ,
      stars: 4
    },
    {
      text: 'I took my dog to the vet for his annual checkup, and the Vet prescribed him 42 tablets' +
        ' of Cephalexin 500mg, 21 tablets of Enalapril 5mg, and 60 tablets of Levothyroxine 25mcg.' +
        ' The Vet charged $32.58 for the Cephalexin, $23.76 for the Enalapril, and $68.72 for the Levothyroxine.' +
        ' With my MediPocket card, I paid $15.71 for the Cephalexin, $14.62 for the Enalapril, ' +
        'and $14.03 for the Levothyroxine. I saved $80.70 total, thank you MediPocket!' ,
      stars: 4,
      name: 'Kristin, Lindenwold, NJ'
    },
    {
      text: 'MediPocket is a blessing for me. Since the day, I have installed this app on my phone;' +
        ' I never paid out of pocket for any of my prescription medications. It has saved me hundreds ' +
        'of dollars on prescription medication over the months. Recently, I saved $400 at the Walgreens' +
        ' pharmacy on medication.' ,
      name: 'George Peterson, CA' ,
      stars: 3
    },
    {
      text: 'It’s a great app as it has helped me find cheaper prices. Since I am on disability, thus every bit' +
        ' counts. Nothing can be much better if you could save on your favorite pharmacies.' ,
      name: 'Carl Mullet, FL' ,
      stars: 4
    },
    {
      text: 'I took my dog to the vet for his annual checkup, and the Vet prescribed him 42 tablets' +
        ' of Cephalexin 500mg, 21 tablets of Enalapril 5mg, and 60 tablets of Levothyroxine 25mcg.' +
        ' The Vet charged $32.58 for the Cephalexin, $23.76 for the Enalapril, and $68.72 for the Levothyroxine.' +
        ' With my MediPocket card, I paid $15.71 for the Cephalexin, $14.62 for the Enalapril, ' +
        'and $14.03 for the Levothyroxine. I saved $80.70 total, thank you MediPocket!' ,
      stars: 4,
      name: 'Kristin, Lindenwold, NJ'
    }
  ];

  constructor(
    private titleservice: Title,
    private meta: Meta,
    private dialog: MatDialog) {

    // this.showDrugListData = false;
    this.titleservice.setTitle(
      'On Demand Medicine Delivery | Save Up to 80% On Prescriptions – MediPocket'
    );
    this.meta.updateTag({
      name: 'description',
      content:
        'Why Paying Too Much For Prescriptions? Save Up to 80% on prescriptions of family and pet and bring medicine to you ON-DEMAND SAME DAY with MediPocket App.'
    });
  }

  triggerAppModal() {
    this.dialog.open(DownloadAppComponent, {panelClass: ['cust-dialog']});
  }

  goToVideo() {
    window.open('https://www.youtube.com/watch?v=_SF493oMMNI');
  }

  ngAfterViewInit() {
    const targets = document.querySelector('app-home').querySelectorAll('[data-src]');

    const lazyLoad = target => {
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            img.setAttribute('src', src);
            img.classList.add('fade-in');
            observer.disconnect();
          }
        })
      }, {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
      });

      io.observe(target);
    }

    // document.querySelector('[data-frame]')['style']['display'] = 'none';
    

    targets.forEach(lazyLoad);

    $('.partners').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1500,
      arrows: false,
      dots: false,
      pauseOnHover: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 520,
          settings: {
            slidesToShow: 2
          }
        }
      ]
    });

    $('.testimonials').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,
      dots: false,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 520,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
      ]
    });
  }

  // getDrugsList(reqPath) {
  //   const url =
  //     'https://kstrdw6014.execute-api.us-east-1.amazonaws.com/beta/rx-api/';
  //   const req = {
  //     reqPath: `GetGPI10s?search=${reqPath}&alias=MS1`,
  //     postData: {},
  //     method: 'GET'
  //   };
  //   clearTimeout(this.typingTimer);
  //   if (this.reqPath !== '') {
  //     this.typingTimer = setTimeout(() => {
  //       console.log('TCL: HomeComponent -> getDrugsList -> req', req);
  //       this.http.post(url, req, {}).subscribe(res => {
  //         // console.log(res);
  //         this.drugsList = res;
  //         this.drugsList = this.drugsList.drugs;
  //         // console.log(this.drugsList);

  //         this.showDrugListData = true;
  //       });
  //     }, 2000);
  //     console.log(reqPath);
  //   }
  // }

  // getDrugDetails(GPI10s) {
  //   console.log('TCL: getDrugDetails -> GPI10s', GPI10s);
  //   const url =
  //     'https://kstrdw6014.execute-api.us-east-1.amazonaws.com/beta/rx-api/';
  //   const req = {
  //     reqPath: `GetGPI14s?GPI10=${GPI10s}&alias=MS1&prediction=20&predictqty=true&predictqtyflat=false`,
  //     postData: {},
  //     method: 'GET'
  //   };
  //   console.log('TCL: HomeComponent -> getDrugsList -> req', req);
  //   this.http.post(url, req, {}).subscribe(res => {
  //     console.log(res);
  //     this.drugsList = [];
  //     this.drugData = res;
  //     this.drugData = this.drugData.predictions;
  //     console.log(this.drugData);

  //     // this.showDrugListData = true;
  //   });
  // }

}
