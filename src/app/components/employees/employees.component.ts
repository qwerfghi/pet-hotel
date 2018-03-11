import {Component, OnInit} from '@angular/core';
import {Employee} from '../../model/Employee';
import {EmployeeService} from '../../service/employee.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UpdateEmployeeComponent} from './update-employee/update-employee.component';

@Component({
  selector: 'app-personal',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];

  newEmployee: Employee;

  id: number;

  constructor(private modalService: NgbModal,
              private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.newEmployee = new Employee();
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => this.employees = employees);
  }

  deleteEmployee(): void {
    this.employeeService.deleteEmployee(this.id).subscribe(() => this.getEmployees());
  }

  addEmployee(): void {
    this.employeeService.addEmployee(this.newEmployee).subscribe(() => this.getEmployees());
  }

  showModal(id: number, employee: Employee) {
    const modalRef = this.modalService.open(UpdateEmployeeComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.employee = employee;
    modalRef.result.then(() => this.getEmployees());
  }
}
