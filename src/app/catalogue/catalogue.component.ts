import { Component } from '@angular/core';
import { SharedDataService } from '../services/shared-data.service';
import { ICat } from '../interfaces/interfaces';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CATalogueComponent {
  private unsubscribe$ = new Subject<void>();
  catData: ICat[] = [];
  constructor(private sharedData: SharedDataService){
    this.sharedData.getData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((cats: ICat[]) => {
        this.catData = cats;
        console.log(cats)
      })
  }


}
