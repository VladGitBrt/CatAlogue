import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CATalogueComponent } from './catalogue.component';

describe('CATalogueComponent', () => {
  let component: CATalogueComponent;
  let fixture: ComponentFixture<CATalogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CATalogueComponent]
    });
    fixture = TestBed.createComponent(CATalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
