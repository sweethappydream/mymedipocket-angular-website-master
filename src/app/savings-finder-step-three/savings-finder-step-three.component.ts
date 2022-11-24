 
import { Component, OnInit, ViewChild } from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var $: any;
declare const google: any;
@Component({
  selector: 'app-savings-finder-step-three',
  templateUrl: './savings-finder-step-three.component.html',
  styleUrls: ['./savings-finder-step-three.component.scss']
})
export class SavingsFinderStepThreeComponent implements OnInit {
  @ViewChild('map', { static: true }) mapRef: any;
  closeResult: string;
  reqPath: string;
  showDrugListData: boolean;
  drugsList: any;
  drugData: any;
  drugDetail: any;
  typingTimer: any;
  medicationInfoBox: boolean;
  medicationListBox: boolean;
  medicationListDetail: any = [];
  drugDetailList: any;
  qty: number;
  qtyArray: any = [];
  editmedicationIndex: any = '';
  editmedicationInfoBox: boolean = false;
  editMedicationdata: any = [];
  address: any;
  constructor(
    // private modalService: NgbModal,
    private http: HttpClient,
    // private spinnerService: Ng4LoadingSpinnerService
  ) {


    this.showDrugListData = false;
    this.medicationInfoBox = false;
    this.qty = 0;
  }

  ngOnInit() {
    $('app-header').addClass('hide-header');
    $('app-footer').addClass('hide-footer');
    this.address = localStorage.getItem('address');
    this.loadmap();

    console.log(this.medicationListDetail.length);

    var getData = localStorage.getItem("medicationListDetails");
    console.log(getData);
    var details = JSON.parse(getData);
    console.log(details);
    // // this.medicationListDetail = details.list;
    if (details.list.length > 0) {
      // var getData = localStorage.getItem("medicationList");
      // var details = JSON.parse(getData);
      // console.log(details);
      this.medicationListDetail = details.list;
      console.log(this.medicationListDetail);
      console.log(this.medicationListDetail.length != 0);
      this.medicationListBox = true;
    }
  }

  // loadMap
  loadmap() {
    var myltln = localStorage.getItem("latlng");
    var ltlnjson = JSON.parse(myltln);
    var myLatLng = { lat: ltlnjson.lat, lng: ltlnjson.lng };
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

  getDrugsList(reqPath) {
    const url =
      'https://kstrdw6014.execute-api.us-east-1.amazonaws.com/beta/rx-api/';
    const req = {
      reqPath: `GetGPI10s?search=${reqPath}&alias=MS1`,
      postData: {},
      method: 'GET'
    };
    clearTimeout(this.typingTimer);
    if (this.reqPath !== '') {

      this.typingTimer = setTimeout(() => {
        this.http.post(url, req, {}).subscribe(res => {
          // console.log(res); 
          this.drugsList = res;
          this.drugsList = this.drugsList.drugs;
          // console.log(this.drugsList);
          this.showDrugListData = true;
        });
      }, 1000);
    } else {
      this.showDrugListData = false;
    }
  }

  getDrugDetails(GPI10s) {
    this.reqPath = '';
    console.log('TCL: getDrugDetails -> GPI10s', GPI10s);
    const url =
      'https://kstrdw6014.execute-api.us-east-1.amazonaws.com/beta/rx-api/';
    const req = {
      reqPath: `GetGPI14s?GPI10=${GPI10s}&alias=MS1&prediction=20&predictqty=true&predictqtyflat=false`,
      postData: {},
      method: 'GET'
    };
    console.log('TCL: HomeComponent -> getDrugsList -> req', req);
    this.http.post(url, req, {}).subscribe(res => {
      console.log(res);
      this.drugData = res;
      // this.drugData = this.drugData.predictions;
      this.drugDetailList = res;
      console.log(this.drugDetailList);
      this.drugDetail = this.drugDetailList.predictions[0];
      this.qtyArray = [];
      const qtyArrayLength = this.drugDetailList.predictions[0].QtyPrediction
        .length;
      console.log(qtyArrayLength);

      if (qtyArrayLength >= 3) {
        for (let i = 0; i < 3; i++) {
          this.qtyArray.push(
            this.drugDetailList.predictions[0].QtyPrediction[i]
          );
        }
      } else {
        for (let i = 0; i < qtyArrayLength; i++) {
          this.qtyArray.push(
            this.drugDetailList.predictions[0].QtyPrediction[i]
          );
        }
      }
      if (this.qtyArray.length > 0) {
        this.qty = this.qtyArray[0].qty;
      }
      console.log(this.qtyArray);
      console.log(this.drugData);
      this.showDrugListData = false;
      this.medicationInfoBox = true;
    });
  }

  setDrugDetail(i: number) {
    this.editmedicationInfoBox = false;
    this.medicationInfoBox = true;
    this.drugDetail = this.drugDetailList.predictions[i];
    const index = i;
    this.qty = 0;
    this.qtyArray = [];
    const qtyArrayLength = this.drugDetailList.predictions[index].QtyPrediction
      .length;
    console.log(qtyArrayLength);
    if (qtyArrayLength >= 3) {
      for (let j = 0; j < 3; j++) {
        this.qtyArray.push(
          this.drugDetailList.predictions[index].QtyPrediction[j]
        );
      }
    } else {
      for (let j = 0; j < qtyArrayLength; j++) {
        this.qtyArray.push(
          this.drugDetailList.predictions[index].QtyPrediction[j]
        );
      }
    }
    // console.log(this.qtyArray);       change
    // this.modalService.dismissAll();
    if (this.qtyArray.length > 0) {
      this.qty = this.qtyArray[0].qty;
    }
    console.log(this.qtyArray);
    console.log(this.drugData);
    this.showDrugListData = false;
    this.medicationInfoBox = true;
    // this.modalService.dismissAll();
  }

  closeMedicationInfoBox() {
    this.medicationInfoBox = false;
  }
  closeeditMedicationInfoBox() {
    this.editmedicationInfoBox = false;
    this.medicationListBox = true;
  }

  qtyInc() {
    this.qty = this.qty + 1;
  }
  qtyDec() {
    if (this.qty !== 0) {
      this.qty = this.qty - 1;
    }
  }
  qtySet(value: number) {
    this.qty = value;
    console.log(this.qty);
  }

  medicationListData(data: any) {
    this.editmedicationInfoBox = false;
    console.log(data);
    // if (this.qtyArray.length > 0) {
    //   this.qty = this.qtyArray[0].qty;
    // }
    var mainData = {
      BN: data.BN,
      Strength: data.Strength,
      DosageForm: data.DosageForm,
      AN: data.AN,
      LN: data.LN,
      NDC: data.NDC,
      DrugType: data.DrugType,
      QtyPrediction: this.qty
    }
    this.medicationListDetail.push(mainData);
    console.log(this.medicationListDetail);
    const medicationListDetailData = JSON.stringify(this.medicationListDetail);
    localStorage.setItem(
      'medicationListDetails',
      `{"list": ${medicationListDetailData}}`
    );
    this.medicationInfoBox = false;
    this.medicationListBox = true;
  }

  updatemedicationListData(data: any) {
    this.editmedicationInfoBox = false;
    console.log(data);

    data.QtyPrediction = this.qty;
    console.log(data.QtyPrediction);
    // var mainData.QtyPrediction: this.qty
    this.medicationListDetail[this.editmedicationIndex].QtyPrediction = data.QtyPrediction;
    console.log(this.medicationListDetail);
    const medicationListDetailData = JSON.stringify(this.medicationListDetail);
    localStorage.setItem(
      'medicationList',
      `{"list": ${medicationListDetailData}}`
    );
    this.medicationInfoBox = false;
    this.medicationListBox = true;
  }

  editMedication(value, index) {
    console.log(value);
    this.editMedicationdata = value
    console.log(index);
    this.editmedicationIndex = index;
    this.medicationListBox = false;
    this.editmedicationInfoBox = true;
  }
  removeMedication(data) {
    this.medicationListDetail.pop(data);
    console.log(this.medicationListDetail);
    const medicationListDetailData = JSON.stringify(this.medicationListDetail);
    localStorage.setItem(
      'medicationListDetails',
      `{"list": ${medicationListDetailData}}`
    );
    if (this.medicationListDetail.length == 0) {
      console.log(this.medicationListDetail === []);
      this.medicationListBox = false;
    }
  }
}