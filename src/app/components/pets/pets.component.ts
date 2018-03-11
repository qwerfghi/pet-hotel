import {Component, OnInit} from '@angular/core';
import {PetService} from '../../service/pet.service';
import {Pet} from '../../model/Pet';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UpdatePetsComponent} from "./update-pets/update-pets.component";

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  pets: Pet[];

  newPet: Pet;

  id: number;

  constructor(private modalService: NgbModal,
              private petService: PetService) {
  }

  ngOnInit() {
    this.newPet = new Pet();
    this.getPets();
  }

  getPets(): void {
    this.petService.getPets()
      .subscribe(pets => this.pets = pets);
  }

  deletePet(): void {
    this.petService.deletePet(this.id).subscribe(() => this.getPets());
  }

  addPet(): void {
    this.petService.addPet(this.newPet).subscribe(() => this.getPets());
  }

  showModal(id: number, pet: Pet) {
    const modalRef = this.modalService.open(UpdatePetsComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.pet = pet;
    modalRef.result.then(() => this.getPets());
  }
}
