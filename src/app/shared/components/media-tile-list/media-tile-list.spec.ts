import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaTileList } from './media-tile-list';

describe('MediaTileList', () => {
  let component: MediaTileList;
  let fixture: ComponentFixture<MediaTileList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaTileList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaTileList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
