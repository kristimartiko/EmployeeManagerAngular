import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManagmentComponent } from '../managment/managment.component';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployee().subscribe((employee: Employee[]) => {
      this.employees = employee;
    })
  }

  deleteEmployee(index: number) {
    this.employeeService.deleteEmployee(this.employees[index]).subscribe(() => {
      this.employees.splice(index, 1);
    }, error => {console.log(error)});
  }

  updateEmployee(employee: Employee) {
    let dialogRef = this.dialog.open(ManagmentComponent,{
      width: '40%',
      data: employee
    });

    dialogRef.afterClosed().subscribe(changed => {
      if(changed) {
        this.employeeService.getAllEmployee().subscribe((employee) => {
          this.employees = employee;
        })
      }
    })
  }
}
