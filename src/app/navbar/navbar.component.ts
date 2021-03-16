import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Employee } from '../employee/employee.model';
import { EmployeeService } from '../employee/employee.service';
import { ManagmentComponent } from '../managment/managment.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private employees: Employee[];

  constructor(public dialog: MatDialog,
              private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  openDialog() {
    let dialogRef = this.dialog.open(ManagmentComponent, {width: '40%'});

    dialogRef.afterClosed().subscribe(changed => {
      if(changed) {
        this.employeeService.getAllEmployee().subscribe((employee) => {
          this.employees = employee;
        })
      }
    })
  }

}
