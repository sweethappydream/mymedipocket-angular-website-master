import { Component, OnInit } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var $: any;
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {

  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    company_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    inquire_type: new FormControl('0', Validators.required),
    subject: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  })

  constructor(
    private http: HttpClient,
    private titleservice: Title,
    private meta: Meta
  ) {
    this.titleservice.setTitle(
      'Prescription Savings Card | Best Online Medicine App – Medipocket'
    );
    this.meta.updateTag({
      name: 'description',
      content:
        'Get your FREE Prescription Saving Card by quick sign up! Save Up to 80% on the prescription of family and pets and get On-Demand Same Day Delivery!'
    });
  }

  contactMe() {

    if (!this.contactForm.valid) {
      return console.log('form invalid')
    }

    this.http.post(`https://mymedipocket.com/sndmail/sendcon.php`, this.contactForm.value).subscribe(console.log, console.error);

  }
}
