import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ManagmentComponent } from '../managment/managment.component';
import { DataService } from '../navbar/data.service';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  @Input() searchText: string;
  subscription: Subscription;

  constructor(private employeeService: EmployeeService,
              private dialog: MatDialog,
              private data: DataService) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployee().subscribe((employee: Employee[]) => {
      this.employees = employee;
      console.log(employee);
    });
    this.subscription = this.data.currentSearchText.subscribe((message) => {
      this.searchText = message;
      console.log(message);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
