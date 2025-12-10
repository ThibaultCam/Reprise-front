import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Secure } from './secure';

describe('Secure', () => {
  let component: Secure;
  let fixture: ComponentFixture<Secure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Secure]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Secure);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
