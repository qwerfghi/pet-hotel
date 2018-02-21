import {Component, OnInit} from '@angular/core';
import {Personal} from '../../model/personal';
import {PersonalService} from '../../service/personal.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  personal: Personal[];

  constructor(private personalService: PersonalService) {
  }

  ngOnInit() {
    this.getVisitors();
  }

  getVisitors(): void {
    this.personalService.getPersonals()
      .subscribe(personal => this.personal = personal);
  }

}
