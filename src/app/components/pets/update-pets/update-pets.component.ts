import {Component, Input, OnInit} from '@angular/core';
import {Pet} from '../../../model/Pet';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PetService} from '../../../service/pet.service';

@Component({
  selector: 'app-update-pets',
  templateUrl: './update-pets.component.html',
  styleUrls: ['./update-pets.component.css']
})
export class UpdatePetsComponent implements OnInit {

  @Input() id: number;

  @Input() pet: Pet;

  constructor(public activeModal: NgbActiveModal,
              private petService: PetService) {
  }

  ngOnInit() {
  }

  updatePet(): void {
    this.petService.updatePet(this.id, this.pet).subscribe(() => this.activeModal.close('success'));
  }
}
