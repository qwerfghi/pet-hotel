import {Component, OnInit} from '@angular/core';
import {Owner} from '../../model/Owner';
import {OwnerService} from '../../service/owner.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UpdateOwnersComponent} from "./update-owners/update-owners.component";

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent implements OnInit {

  owners: Owner[];

  newOwner: Owner;

  id: number;

  constructor(private modalService: NgbModal,
              private ownerService: OwnerService) {
  }

  ngOnInit() {
    this.newOwner = new Owner();
    this.getOwners();
  }

  getOwners(): void {
    this.ownerService.getOwners()
      .subscribe(visitors => this.owners = visitors);
  }

  deleteOwner(): void {
    this.ownerService.deleteOwner(this.id).subscribe(() => this.getOwners());
  }

  addOwner(): void {
    this.ownerService.addOwner(this.newOwner).subscribe(() => this.getOwners());
  }

  showModal(id: number, owner: Owner) {
    const modalRef = this.modalService.open(UpdateOwnersComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.owner = owner;
    modalRef.result.then(() => this.getOwners());
  }
}
