import {Component, OnInit} from '@angular/core';
import {PetService} from '../../service/pet.service';
import {Pet} from '../../model/pet';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  pets: Pet[];

  constructor(private petService: PetService) {
  }

  ngOnInit() {
    this.getVisitors();
  }

  getVisitors(): void {
    this.petService.getPets()
      .subscribe(pets => this.pets = pets);
  }

}
