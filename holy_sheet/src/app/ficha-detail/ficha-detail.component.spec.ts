import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaDetailComponent } from './ficha-detail.component';

describe('FichaDetailComponent', () => {
  let component: FichaDetailComponent;
  let fixture: ComponentFixture<FichaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
