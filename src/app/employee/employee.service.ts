import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  public getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`http://localhost:8787/employee`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`http://localhost:8787/employee/add`, employee);
  }

  public updateEmployee(employee: Employee, id: number): Observable<Employee> {
    return this.http.put<Employee>(`http://localhost:8787/employee/update/${id}`, employee);
  }

  public deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8787/employee/delete/${id}`);
  }
}
