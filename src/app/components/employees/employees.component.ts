import {Component, OnInit} from '@angular/core';
import {Employee} from '../../model/employee';
import {EmployeeService} from '../../service/employee.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-personal',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];

  id = new FormControl();

  constructor(private personalService: EmployeeService) {
  }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.personalService.getEmployees()
      .subscribe(personal => this.employees = personal);
  }

  deleteEmployee(): void {
    this.personalService.deleteEmployee(this.id.value).subscribe();
  }

}
