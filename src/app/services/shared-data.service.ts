import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private catDataSubject = new Subject<any>();
  

  sendData(data: any) {
    this.catDataSubject.next(data);
  }

  getData() {
    return this.catDataSubject.asObservable();
  }
}
