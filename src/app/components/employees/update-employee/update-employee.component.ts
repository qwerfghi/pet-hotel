import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Employee} from '../../../model/Employee';
import {EmployeeService} from '../../../service/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  @Input() id: number;

  @Input() employee: Employee;

  constructor(public activeModal: NgbActiveModal,
              private employeeService: EmployeeService) {
  }

  ngOnInit() {
  }

  updateEmployee(): void {
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(() => this.activeModal.close('success'));
  }
}
