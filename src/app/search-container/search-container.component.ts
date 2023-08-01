import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IBreed } from '../interfaces/interfaces'
import { Observable, Subject, map, startWith, switchMap, takeUntil } from 'rxjs';
import { FormControl } from '@angular/forms';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.css']
})
export class SearchContainerComponent implements OnInit {
  breedsList: IBreed[] = [];
  itemsCounter = ["5","10","25","50"]
  breedsFormControl = new FormControl('');
  filteredOptions$!: Observable<IBreed[]>;
  selectedBreed: string = '';
  selectedItems: string = '10';
  private unsubscribe$ = new Subject<void>();
  constructor (private apiService: ApiService, private sharedData: SharedDataService) {
  }

  ngOnInit(): void {
    this.filteredOptions$ = this.breedsFormControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this._filter((value as string)))
    );
    this.apiService.getCatBreeds()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(breeds => {
      this.breedsList = breeds
    })
    this.apiService.getRandomCats()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.sharedData.sendData(data)

      })
  }

  private _filter(value: string): Observable<IBreed[]> {
    const filterValue = value.toLowerCase();
    return this.apiService.getCatBreeds().pipe(
      map(options => options.filter(option => option.name.toLowerCase().includes(filterValue)))
    );
  }

  public onOptionSelected(event: any): void {
    this.breedsList.forEach(breed => {
      if(breed.name === event.option.value) {
        this.apiService.getBreed(breed.id, this.selectedItems)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(data => this.sharedData.sendData(data))
      }
    })
  }

  

}
