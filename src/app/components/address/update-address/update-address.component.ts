import {Component, Input, OnInit} from '@angular/core';
import {Address} from '../../../model/Address';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AddressService} from '../../../service/address.service';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent implements OnInit {

  @Input() id: number;

  @Input() address: Address;

  constructor(public activeModal: NgbActiveModal,
              private addressService: AddressService) {
  }

  ngOnInit() {
  }

  updateAddress(): void {
    this.addressService.updateAddress(this.id, this.address).subscribe(() => this.activeModal.close('success'));
  }
}
