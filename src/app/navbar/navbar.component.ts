import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Employee } from '../employee/employee.model';
import { EmployeeService } from '../employee/employee.service';
import { ManagmentComponent } from '../managment/managment.component';
import { DataService } from './data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private employees: Employee[];
  searchText: string;

  constructor(public dialog: MatDialog,
              private employeeService: EmployeeService,
              private data: DataService) { }

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

  onSearch() {
    this.data.changeMessage(document.querySelector('input').value);
  }

}
