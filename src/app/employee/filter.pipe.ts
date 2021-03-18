import { Pipe, PipeTransform } from "@angular/core";
import { Employee } from "./employee.model";

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
    transform(employee: any[], searchText: string): Employee[] {
        if(!employee || !searchText) {
            return employee;
        }
        return employee.filter(employee => {
            return employee.name.toLowerCase().includes(searchText.toLowerCase())
        });
    }
    
}