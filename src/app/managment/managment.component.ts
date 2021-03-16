import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../employee/employee.service';

@Component({
  selector: 'app-managment',
  templateUrl: './managment.component.html',
  styleUrls: ['./managment.component.css']
})
export class ManagmentComponent implements OnInit {

  employeeEditForm: FormGroup;
  isUpdate: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public employee: any,
              private employeeService: EmployeeService,
              private matDialogRef: MatDialogRef<ManagmentComponent>) { }

  ngOnInit(): void {
    if(this.employee) {
      this.isUpdate = true;
      this.employeeEditForm = new FormGroup({
        'id': new FormControl(this.employee.id, Validators.required),
        'name': new FormControl(this.employee.name, Validators.required),
        'email': new FormControl(this.employee.email, Validators.required),
        'jobTitle': new FormControl(this.employee.jobTitle, Validators.required),
        'phone': new FormControl(this.employee.phone, Validators.required),
        'imageUrl': new FormControl(this.employee.imageUrl, Validators.required),
        'employeeCode': new FormControl(this.employee.employeeCode, Validators.required)
      });
    } else {
      this.employeeEditForm = new FormGroup({
        'name': new FormControl(null, Validators.required),
        'email': new FormControl(null, Validators.required),
        'jobTitle': new FormControl(null, Validators.required),
        'phone': new FormControl(null, Validators.required),
        'imageUrl': new FormControl(null, Validators.required)
      });
    }
  }

  onSubmit() {
    if(!this.employeeEditForm.valid) return;

    if(!this.isUpdate) {
      this.employeeService.addEmployee(this.employeeEditForm.value).subscribe(() => {
        this.matDialogRef.close(true);
      }, error => {console.log(error)})
    } else {
      this.employeeService.updateEmployee(this.employeeEditForm.value).subscribe(() => {
        this.matDialogRef.close(true)
      }, error=> { console.log(error)} );
    }
  }

  onClose() {
    this.matDialogRef.close(false);
  }

}
