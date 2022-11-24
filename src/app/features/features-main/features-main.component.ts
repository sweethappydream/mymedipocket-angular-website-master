import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-features-main',
  templateUrl: './features-main.component.html',
  styleUrls: ['./features-main.component.scss']
})
export class FeaturesMainComponent implements AfterViewInit {
  name: string;
  email: string;
  city: string;
  message: string;

  constructor() { }

  ngAfterViewInit() {
    const targets = document.querySelector('app-features-main').querySelectorAll('[data-src]');

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

    targets.forEach(lazyLoad);
  }

  contactHome() {

    let nm  = $('#name').val();
    let ln  = $('#city').val();
    let uemail  = $('#email').val();
    let umsg = $('#message').val();


    if (nm == '') {
      $('#name').css('border', '1px solid red');
    } else if (ln == '') {
      $('#city').css('border', '1px solid red');
    } else if (uemail == '') {
      $('#email').css('border', '1px solid red');
    } else if (umsg == '') {
      $('#message').css('border', '1px solid red');
    } else {


    $.ajax({
  method: 'POST',
  url: 'https://mymedipocket.com/sndmail/sendhome.php',
  data: { name: this.name, city: this.city, email: this.email, message: this.message }
}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available

  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
    $('#smsg').css('display', 'block');
    }


  }

}
