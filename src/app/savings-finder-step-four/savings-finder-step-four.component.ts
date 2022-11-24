import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
declare var $: any;
declare const google: any;
@Component({
  selector: 'app-savings-finder-step-four',
  templateUrl: './savings-finder-step-four.component.html',
  styleUrls: ['./savings-finder-step-four.component.scss']
})
export class SavingsFinderStepFourComponent implements OnInit {
  @ViewChild('description', { static: true }) descriptionModal: TemplateRef<any>;
  @ViewChild('medicationHelp', { static: true }) medicationHelp: TemplateRef<any>;
  closeResult: string;
  medicationListDetail: any = [];
  myLatLng: any;
  allDetails: any = [];
  activeButton: boolean;
  showTime = false;
  showsubResult: any = [];
  medicalmodalData: any;
  totalMedicine: number;
  showlatlngData: any;
  calData: any = [];
  qtyArray: any = [];
  address: any;
  public newMarkerArray: any = [];
  public markers: any = [];
  map: any;
  cardPrice: number;
  copayAmount: number;
  copayStatus = false;
  estimatedSavings: number;
  estimatedSavingsgeneric: number;
  estimatedSavingsStatus = false;
  estimatedSavingsgenericStatus = false;
  genericcopayStatus = false;
  genericcopayAmount: number;
  totalAmount: number;
  totalestimateStatus = false;
  brandStatus = false;
  genericStatus = false;
  alltpeStatus = false;
  showuncStatus = false;
  showpriceStatus = false;
  normalPrice = false;
  sumArr: any = [];

  totalvalue = 0;
  constructor(
    // private modalService: NgbModal,
    private http: HttpClient,
    // private spinnerService: Ng4LoadingSpinnerService,
    private router: Router
    ) {

    var myltln = localStorage.getItem("latlng");
    var ltlnjson = JSON.parse(myltln);
    this.myLatLng = { lat: ltlnjson.lat, lng: ltlnjson.lng };
    var getData = localStorage.getItem('medicationListDetails');
    var details = JSON.parse(getData);
    this.medicationListDetail = details.list;
    console.log(this.medicationListDetail);
    for (let item of this.medicationListDetail) {
      var typeStatus = item.DrugType;
      if (typeStatus == 'B') {
        this.brandStatus = true;
      }
      else if (typeStatus == 'G') {
        this.genericStatus = true;
      }
      else if (typeStatus == 'G' && typeStatus == 'B') {
        this.alltpeStatus = true;
      }
    }
    this.getmedicalDetails();
    this.activeButton = true;
    this.showlatlngData = [];
    var copayvalue: any = localStorage.getItem('copay')
    console.log(copayvalue);
    if (copayvalue > 0) {
      this.copayStatus = true;
      this.copayAmount = copayvalue;
      console.log(this.copayAmount);
    }
    var generic_copayvalue: any = localStorage.getItem('generic_copay');
    if (generic_copayvalue > 0) {
      this.genericcopayStatus = true;
      this.genericcopayAmount = generic_copayvalue;
      console.log(this.genericcopayAmount);
    }
  }
  activeButtonToggle() {

    this.activeButton = !this.activeButton;
    // if(this.activeButton){}
    if (this.activeButton === false) {
      let localArr = this.qtyArray;
      localArr.sort(function (a, b) {
        if (a.distance < b.distance) { return -1; }
        // if(a.firstname > b.firstname) { return 1; }
        return 0;
      });
    }
    if (this.activeButton === true) {
      let localArr = this.qtyArray;
      localArr.sort(function (a, b) {
        if (a.pricing[0].price < b.pricing[0].price) { return -1; }
        // if(a.firstname > b.firstname) { return 1; }
        return 0;
      });
    }
  }
  openDescriptionModal(content, phrmaitem) {
    // this.modalService.open(this.descriptionModal);
    this.medicalmodalData = phrmaitem;


    let arr = [];
    arr = this.showsubResult.pharmData;


    for (const item of arr) {
      let addValue = [];
      let value = 0;
      for (const pricingData of item.pricing) {
        if (!pricingData.unc) {
          value = pricingData.price;
          addValue.push(value);
          pricingData.min_price = value;
        } else {
          if (pricingData.unc) {
            if (pricingData.price > pricingData.unc) {
              this.showuncStatus = true;
              value = pricingData.unc;
              addValue.push(value);
              pricingData.min_price = value;
            } else if (pricingData.price < pricingData.unc) {
              this.showpriceStatus = true;
              value = pricingData.price;
              addValue.push(value);
              pricingData.min_price = value;
            }
          }
        }
        // else {
        //   this.normalPrice = true;

        // }
        this.totalvalue = eval(addValue.join('+'));        
        item.totalprice = this.totalvalue;
         console.log(this.showsubResult.pharmData);
        this.sumArr.push({
          key: [this.medicationListDetail, this.showsubResult.pharmData]
        });
        // console.log(this.medicationListDetail);
        // console.log(this.showsubResult.pharmData);
        // console.log(this.sumArr);
      }
    }

    // if (this.medicalmodalData.ChainType == "B") {
    //   if (this.copayStatus == true) {

    if (this.copayAmount > this.cardPrice) {
      this.copayStatus == true
      this.estimatedSavingsStatus = true;
      this.estimatedSavings = this.copayAmount - this.cardPrice;
      console.log(this.estimatedSavings);
    }
    //   }
    // }
    // if (this.medicalmodalData.ChainType == "N") {
    //   if (this.genericcopayStatus == true) {
    if (this.genericcopayAmount > this.cardPrice) {
      this.estimatedSavingsgenericStatus = true;
      this.genericcopayStatus == true
      this.estimatedSavingsgeneric = this.genericcopayAmount - this.cardPrice;
      console.log(this.estimatedSavingsgeneric);
    }
    //   }
    // }
    // if (this.medicalmodalData.ChainType == "N" || this.medicalmodalData.ChainType == "B") {
    if (this.copayAmount > this.cardPrice && this.genericcopayAmount > this.cardPrice) {
      // this.totalAmount = this.estimatedSavings + this.estimatedSavingsgeneric;
      this.estimatedSavingsStatus = false;
      this.estimatedSavingsgenericStatus = false;
      this.totalestimateStatus = true;
      var branamount;
      var genericamount
      for (let item of this.medicationListDetail) {
        if (item.DrugType == 'B') {
          var brand = this.estimatedSavings
          brand += brand;
          branamount = brand;
        }
        if (item.DrugType == 'G') {
          var generic;
          generic += generic;
          genericamount = generic;
        }
      }
      var total = branamount + genericamount;
      this.totalAmount = total;
      console.log(this.totalAmount)
    }

    // }

    this.loadmodelmap();
    this.calData = [];
    var calendarData = this.medicalmodalData.pharmacyhourstext.split('</br>');
    calendarData.pop();
    var daytime;
    for (let item of calendarData) {
      daytime = item.split(':');
      this.calData.push(daytime)
    }
  }
  openModal(content) {
    // this.modalService.open(this.descriptionModal);
    this.calData = [];
    this.medicalmodalData = content;
    this.loadmodelmap();
    var calendarData = this.medicalmodalData.pharmacyhourstext.split('</br>');
    calendarData.pop();

    var daytime;
    for (let item of calendarData) {
      daytime = item.split(':');
      this.calData.push(daytime)
    }
  }

  openModalhelp(medicationHelp) {
    // this.modalService.open(this.medicationHelp);
  }

  ngOnInit() {
    $('app-header').addClass('hide-header');
    $('app-footer').addClass('hide-footer');
    this.address = localStorage.getItem('address');
    this.loadmap();
  }

  gosavingCard() {
    // this.modalService.dismissAll();
    this.router.navigate(['/pharmacy-savings-card']);
  }

  // loadMap
  loadmap() {
    var myltln = localStorage.getItem("latlng");
    var ltlnjson = JSON.parse(myltln);
    var myLatLng = { lat: ltlnjson.lat, lng: ltlnjson.lng };
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: myLatLng
    });
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: this.map,
      icon: '../../../../assets/img/google-map.png',
    });
  }

  // loadModelMap
  loadmodelmap() {
    var myLatLng = { lat: this.medicalmodalData.lat, lng: this.medicalmodalData.lng };
    var map = new google.maps.Map(document.getElementById('modelmap'), {
      zoom: 13,
      center: myLatLng
    });
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: this.medicalmodalData.street1,
      icon: '../../../../assets/img/pin.png',
    });
  }

  loadmap2() {
    var myOptions = {
      center: new google.maps.LatLng(this.showlatlngData[0].lat, this.showlatlngData[0].lng),
      zoom: 9,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map'), myOptions);
    var bounds = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow();
    for (var i = 0; i < this.showlatlngData.length; i++) {
      let itemData = this.showlatlngData[i].item;
      var myLatLng = new google.maps.LatLng(this.showlatlngData[i].lat, this.showlatlngData[i].lng);
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.showlatlngData[i].lat, this.showlatlngData[i].lng),
        map: map,
        title: this.showlatlngData[i].name,
        icon: '../../../../assets/img/pin.png',
      });
      // this.newMarkerArray.push(marker);
      // if (itemData != 1) {
      //   this.map.setCenter(marker.getPosition())
      // }
      marker.addListener('click', () => {
        // infowindow.open(map, marker);
        this.openModal(itemData);
      });
      bounds.extend(myLatLng);
    }
    map.fitBounds(bounds);
  }
  // clearMarkers(data) {
  //   for (var i = 0; i < data.length; i++) {
  //     this.markers[i].setMap(null);
  //   }
  // }

  getmedicalDetails() {
    // this.spinnerService.show();
    const arr = [];
    for (let item of this.medicationListDetail) {
      arr.push({
        "ndc": item.NDC, "qty": item.QtyPrediction
      })
    }
    const url =
      'https://kstrdw6014.execute-api.us-east-1.amazonaws.com/beta/rx-api/';
    const req = {
      "reqPath": "GetPrices",
      "postData": {
        "radius": 2,
        "pharmAlias": "P2",
        "unc": [
          "unc"
        ],
        "medications": arr,
        "mode": "rollup",
        "lat": this.myLatLng.lat,
        "lng": this.myLatLng.lng,
      },
      "method": "POST"
    };
    this.http.post(url, req, {}).subscribe(res => {
      // this.spinnerService.hide();
      this.allDetails = res;
      this.qtyArray = [];
      let dis_arr: any = [];
      // for (let item of this.allDetails.pharmData) {
      //   if (item.distance <= 2) {
      //     dis_arr.push(item)
      //   }
      // }
      // this.qtyArray = dis_arr;
      this.qtyArray = this.allDetails.pharmData
      if (this.qtyArray) {
        this.qtyArray.sort(function (a, b) {
          if (a.pricing[0].price < b.pricing[0].price) { return -1; }
          return 0;
        });
      }
      var countNumeber = 0;
      for (let item of this.qtyArray) {
        countNumeber += item.Summary.PharmacyCount;
      }
      this.totalMedicine = countNumeber;
    },
      err => {
        var err = err.json();
        // this.spinnerService.hide();
      }
    );
  }

  getmedicalDetailsbyDistance(index) {
    if (this.qtyArray[index].showTime == undefined) {
      this.qtyArray[index].showTime = true;
    } else {
      this.qtyArray[index].showTime = !this.qtyArray[index].showTime;
    }
    console.log(this.qtyArray[index].pricing);
    // this.cardPrice = this.qtyArray[index].pricing[0].price

    var PharmacyGroup = this.qtyArray[index].Summary.PharmacyGroup
    const arr = [];
    for (let item of this.medicationListDetail) {
      arr.push({
        "ndc": item.NDC, "qty": item.QtyPrediction
      })
    }
    const url =
      'https://kstrdw6014.execute-api.us-east-1.amazonaws.com/beta/rx-api/';
    const req = {
      "reqPath": "GetPrices",
      "postData": {
        "radius": 2,
        "pharmAlias": "P2",
        "unc": [
          "unc"
        ],
        "medications": arr,
        "sort": "distance",
        "pharmacyGroup": PharmacyGroup,
        "lat": this.myLatLng.lat,
        "lng": this.myLatLng.lng,
      },
      "method": "POST"
    };
    this.http.post(url, req, {}).subscribe(res => {
      this.showsubResult = res; 


      let arr = [];
      arr = this.showsubResult.pharmData;


      for (const item of arr) {
        let addValue = [];
        let value = 0;
        for (const pricingData of item.pricing) {
          if (!pricingData.unc) {
            value = pricingData.price;
            addValue.push(value);
            pricingData.min_price = value;
            console.log("TCL: getmedicalDetailsbyDistance -> pricingData.min_price", pricingData.min_price)
          } else {
            if (pricingData.unc) {
              if (pricingData.price > pricingData.unc) {
                this.showuncStatus = true;
                value = pricingData.unc;
                addValue.push(value);
                pricingData.min_price = value;
                console.log("TCL: getmedicalDetailsbyDistance -> pricingData.min_price", pricingData.min_price)
              } else if (pricingData.price < pricingData.unc) {
                this.showpriceStatus = true;
                value = pricingData.price;
                addValue.push(value);
                pricingData.min_price = value;
                console.log("TCL: getmedicalDetailsbyDistance -> pricingData.min_price", pricingData.min_price)
              }
            }
          }
          // else {
          //   this.normalPrice = true;
          // }
          this.totalvalue = eval(addValue.join('+'));
          item.totalprice = this.totalvalue;
          console.log(item.totalprice);
          for (let price of this.qtyArray[index].pricing) {
            // this.cardPrice=price;
            price.min_price = pricingData.min_price;
            console.log("TCL: getmedicalDetailsbyDistance -> price.min_price", price.min_price)
            this.cardPrice = price.min_price;
            
            
            console.log("TCL: getmedicalDetailsbyDistance -> this.cardPrice", this.cardPrice)
          }
        }
      }
      // totalvalue += totalvalue
      var ltlnData = []
      // if (this.showsubResult.pharmData == 1) {
      //   this.markers = this.newMarkerArray;
      // }
      // this.clearMarkers(this.newMarkerArray);
      for (let item of this.showsubResult.pharmData) {
        ltlnData.push({ 'lat': item.lat, 'lng': item.lng, 'name': item.name, 'item': item });
      }
      this.showlatlngData = ltlnData;
      // this.loadmap();
      if (this.qtyArray[index].showTime == undefined || this.qtyArray[index].showTime == false) {
        this.loadmap();
      } else {
        this.loadmap2();
      }
    },
      err => {
        var err = err.json();
      }
    );
  }
}