import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private searchText = new BehaviorSubject('');
  currentSearchText = this.searchText.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.searchText.next(message);
  }
}
