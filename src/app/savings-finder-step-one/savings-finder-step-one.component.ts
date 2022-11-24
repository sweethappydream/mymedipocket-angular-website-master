 
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-savings-finder-step-one',
  templateUrl: './savings-finder-step-one.component.html',
  styleUrls: ['./savings-finder-step-one.component.scss']
})
export class SavingsFinderStepOneComponent implements OnInit {
  zipcode: any;
  lat: any;
  lng: any;
  address: any;
  isValidAddress: boolean;
  constructor(private http: HttpClient, private router: Router) {

    // this.zipcode = '';
    this.isValidAddress = true;
    const address = localStorage.getItem('address');
    console.log('TCL: ngOnInit -> address', address);
    if (address != null) {
      this.zipcode = address;
      console.log(this.zipcode);
    } else {
      this.zipcode = '';
      console.log(this.zipcode);
    }
  }

  ngOnInit() {
    $('app-header').addClass('hide-header');
    $('app-footer').addClass('hide-footer');
  }

  // Get Address By Zipcode
  getAddress() {
    console.log(this.zipcode);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${
      this.zipcode
      }&key=AIzaSyAElqw-1KuqVbokJTAPUkr01U2j_DGlHEM`;
    if (this.zipcode !== '') {
      this.http.get(url).subscribe(res => {
        console.log(res);
        this.address = res;
        if (
          this.address.results[0].address_components[
            this.address.results[0].address_components.length - 1
          ].long_name === 'United States'
        ) {
          localStorage.setItem(
            'latlng',
            `{ "lat": ${
            this.address.results[0].geometry.location.lat
            }, "lng": ${this.address.results[0].geometry.location.lng} }`
          );
          this.address = this.address.results[0].formatted_address.split(',');
          this.address = `${this.address[0]}, ${this.address[1]}`;
          console.log(this.address);
          localStorage.setItem('address', this.address);

          this.router.navigate(['/step2']);
        } else {
          this.isValidAddress = false;
        }
      });
    }
  }

  // Get Current Lat Long
  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resp => {
          resolve({ lat: resp.coords.latitude, lng: resp.coords.longitude });
          localStorage.setItem(
            'latlng',
            `{ "lat": ${resp.coords.latitude}, "lng": ${
            resp.coords.longitude
            } }`
          );
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getLatLong() {
    this.getPosition().then(pos => {
      console.log(`Positon: ${pos.lat} ${pos.lng}`);
      this.lat = pos.lat;
      this.lng = pos.lng;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
        this.lat
        },${this.lng}&key=AIzaSyAElqw-1KuqVbokJTAPUkr01U2j_DGlHEM`;
      this.http.get(url).subscribe(res => {
        console.log(res);
        this.address = res;
        if (
          this.address.results[0].address_components[6].long_name ===
          'United States'
        ) {
          this.address = this.address.results[0].formatted_address;
          console.log(this.address);
          localStorage.setItem('address', this.address);
          localStorage.setItem(
            'latlng',
            `{ "lat": ${
            this.address.results[0].geometry.location.lat
            }, "lng": ${this.address.results[0].geometry.location.lng} }`
          );
          this.router.navigate(['/step2']);
        } else {
          this.isValidAddress = false;
          localStorage.setItem(
            'latlng',
            `{ "lat": ${
            this.address.results[0].geometry.location.lat
            }, "lng": ${this.address.results[0].geometry.location.lng} }`
          );
        }
      });
    });
  }
}