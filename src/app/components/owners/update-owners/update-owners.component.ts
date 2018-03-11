import {Component, Input, OnInit} from '@angular/core';
import {Owner} from '../../../model/Owner';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OwnerService} from '../../../service/owner.service';

@Component({
  selector: 'app-update-owners',
  templateUrl: './update-owners.component.html',
  styleUrls: ['./update-owners.component.css']
})
export class UpdateOwnersComponent implements OnInit {

  @Input() id: number;

  @Input() owner: Owner;

  constructor(public activeModal: NgbActiveModal,
              private ownerService: OwnerService) {
  }

  ngOnInit() {
  }

  updateOwner(): void {
    this.ownerService.updateOwner(this.id, this.owner).subscribe(() => this.activeModal.close('success'));
  }
}
