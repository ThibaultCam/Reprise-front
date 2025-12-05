import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieComponent } from './serie';

describe('Serie', () => {
  let component: SerieComponent;
  let fixture: ComponentFixture<SerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SerieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SerieComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
