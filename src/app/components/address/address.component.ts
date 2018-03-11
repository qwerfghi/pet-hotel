import {Component, OnInit} from '@angular/core';
import {Address} from '../../model/Address';
import {AddressService} from '../../service/address.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UpdateAddressComponent} from "./update-address/update-address.component";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addresses: Address[];

  newAddress: Address;

  id: number;

  constructor(private modalService: NgbModal,
              private addressService: AddressService) {
  }

  ngOnInit() {
    this.newAddress = new Address();
    this.getAddresses();
  }

  getAddresses(): void {
    this.addressService.getAddresses()
      .subscribe(addresses => this.addresses = addresses);
  }

  deleteAddress(): void {
    this.addressService.deleteAddress(this.id).subscribe(() => this.getAddresses());
  }

  addAddress(): void {
    this.addressService.addAddress(this.newAddress).subscribe(() => this.getAddresses());
  }

  showModal(id: number, address: Address) {
    const modalRef = this.modalService.open(UpdateAddressComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.address = address;
    modalRef.result.then(() => this.getAddresses());
  }
}
