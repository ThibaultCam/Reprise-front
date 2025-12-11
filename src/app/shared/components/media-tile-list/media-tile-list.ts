import { Component, Input, OnInit } from '@angular/core';
import { Genre } from '../../../core/models/genre';
import { MediaType } from '../../../core/enums/mediaType';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { Media } from '../../../core/models/media';

@Component({
  selector: 'app-media-tile-list',
  imports: [MatCardModule, MatButtonModule, CommonModule, MatPaginatorModule],
  templateUrl: './media-tile-list.html',
  styleUrl: './media-tile-list.scss',
})
export class MediaTileList implements OnInit {
  @Input() medias!: Media[];
  @Input() mediaType!: MediaType;
  
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageEvent!: PageEvent;
  displayedMedias: Media[] = [];

  ngOnInit(): void {
    this.init();
    this.updateDisplayedList();
  }

  init() {
    this.length = this.medias.length;
  }

  goToMedia(mediaId: string): void {
    window.location.href = `/${this.mediaType}/${mediaId}`;
  }

  inlineGenres(genres: Genre[]): string {
    return genres.map(genre => genre.name).join(', ');
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageIndex = e.pageIndex;
    this.updateDisplayedList();
  }

  updateDisplayedList(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedMedias = this.medias.slice(startIndex, endIndex);
  }
}
