import {Component, OnInit} from '@angular/core';
import {Address} from '../../model/address';
import {AddressService} from '../../service/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addresses: Address[];

  constructor(private addressService: AddressService) {
  }

  ngOnInit() {
    this.getAddresses();
  }

  getAddresses(): void {
    this.addressService.getAddresses()
      .subscribe(addresses => this.addresses = addresses);
  }

}
