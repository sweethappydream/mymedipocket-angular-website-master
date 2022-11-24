import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements AfterViewInit {
  
  ngAfterViewInit() {
    const targets = document.querySelector('app-partners').querySelectorAll('[data-src]');

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

}
