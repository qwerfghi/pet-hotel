import {Component, OnInit} from '@angular/core';
import {Employee} from '../../model/employee';
import {EmployeeService} from '../../service/employee.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-personal',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];

  employee: Employee;

  id = new FormControl();

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.employee = new Employee();
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees);
  }

  deleteEmployee(): void {
    this.employeeService.deleteEmployee(parseInt(this.id.value.toString(), 10)).subscribe(() => this.getEmployees());
  }

  addEmployee(): void {
    this.employeeService.addEmployee(this.employee).subscribe(() => this.getEmployees());
  }

}
