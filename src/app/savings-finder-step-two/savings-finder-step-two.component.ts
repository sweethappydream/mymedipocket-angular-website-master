import { Component, OnInit, ViewChild } from '@angular/core';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;
declare const google: any;
@Component({
  selector: 'app-savings-finder-step-two',
  templateUrl: './savings-finder-step-two.component.html',
  styleUrls: ['./savings-finder-step-two.component.scss']
})
export class SavingsFinderStepTwoComponent implements OnInit {
  @ViewChild('map', { static: true }) mapRef: any;
  closeResult: string;
  address: any;
  areYouInsuredStatus: boolean;
  genericCopayStatus: boolean;
  brandCopayStatus: boolean;
  genericCopayAmount: any;
  brandCopayAmount: any;
  constructor(
    // private modalService: NgbModal
  ) {
    console.log(this.brandCopayAmount);
  }

  ngOnInit() {
    $('app-header').addClass('hide-header');
    $('app-footer').addClass('hide-footer');
    this.address = localStorage.getItem('address');
    this.loadmap();

    this.genericCopayStatus = false;
    this.brandCopayStatus = false;
    this.genericCopayAmount = localStorage.getItem('generic_copay');
    this.brandCopayAmount = localStorage.getItem('copay');
    if (this.genericCopayAmount > 0 || this.brandCopayAmount > 0) {
      this.areYouInsuredStatus = true;
    } else {
      this.areYouInsuredStatus = false;
    }
    // this.genericCopayAmount = 0;
    // this.brandCopayAmount = 0;

  }

  // loadMap
  loadmap() {
    var myltln = localStorage.getItem("latlng");
    var latlngvalue = JSON.parse(myltln);
    var myLatLng = { lat: latlngvalue.lat, lng: latlngvalue.lng };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: myLatLng
    });
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: '../../../../assets/img/google-map.png',
    });
  }

  open(content) {
    // this.modalService
    //   .open(content, { ariaLabelledBy: 'modal-basic-title' })
    //   .result.then(
    //     result => {
    //       this.closeResult = `Closed with: ${result}`;
    //     }
    //   );
  }

  // areYouInsured
  areYouInsured(value: boolean) {
    this.areYouInsuredStatus = value;
    if (this.areYouInsuredStatus == false) {
      console.log('false');
      this.brandCopayAmount = 0;
      this.genericCopayAmount = 0;
      var gen_cop: any = this.genericCopayAmount
      localStorage.setItem('copay', this.brandCopayAmount);
      localStorage.setItem('generic_copay', gen_cop)
    }
  }

  // brandCopay
  brandCopay(value: boolean) {
    this.brandCopayStatus = value;
    if (this.brandCopayStatus == false) {
      this.brandCopayAmount = 0;
      localStorage.setItem('copay', this.brandCopayAmount);
    }
  }

  // genericCopayAmount
  genericCopay(value: boolean, valuenumber: any) {
    this.genericCopayStatus = value;
    console.log(this.genericCopayStatus);
    console.log(valuenumber);
    this.genericCopayAmount = valuenumber;
    console.log(this.genericCopayAmount);
    localStorage.setItem('generic_copay', valuenumber);
  }

  // genericCopayQty
  genericCopayQtyInc() {
    this.genericCopayAmount = Number(this.genericCopayAmount + 1);
    console.log(this.genericCopayAmount);
    const valuenumber: any = this.genericCopayAmount;
    localStorage.setItem('generic_copay', valuenumber);
  }
  genericCopayQtyDec() {
    if (this.genericCopayAmount !== 0) {
      this.genericCopayAmount = this.genericCopayAmount - 1;
      console.log(this.genericCopayAmount);
      const valuenumber: any = this.genericCopayAmount;
      localStorage.setItem('generic_copay', valuenumber);
    }
  }

  // brandCopayQty
  brandCopayQtyInc() {
    this.brandCopayAmount = Number(this.brandCopayAmount + 1);
    localStorage.setItem('copay', this.brandCopayAmount);
  }
  brandCopayQtyDec() {
    if (this.brandCopayAmount !== 0) {
      this.brandCopayAmount = this.brandCopayAmount - 1;
      localStorage.setItem('copay', this.brandCopayAmount);
    }
  }
}