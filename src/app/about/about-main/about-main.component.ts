import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-about-main',
  templateUrl: './about-main.component.html',
  styleUrls: ['./about-main.component.scss']
})
export class AboutMainComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    const targets = document.querySelector('app-about-main').querySelectorAll('[data-src]');

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

    $('.scrolling-interviews').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,
      dots: true,
      pauseOnHover: false,
    });
  }

}
