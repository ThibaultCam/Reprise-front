import { Component, Input } from '@angular/core';
import { Genre } from '../../../core/models/genre';
import { MediaType } from '../../../core/enums/mediaType';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Media } from '../../../core/models/media';

@Component({
  selector: 'app-media-tile-list',
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './media-tile-list.html',
  styleUrl: './media-tile-list.scss',
})
export class MediaTileList {
  @Input() medias!: Media[];
  @Input() mediaType!: MediaType;

  goToMedia(mediaId: string): void {
    window.location.href = `/${this.mediaType}/${mediaId}`;
  }

  inlineGenres(genres: Genre[]): string {
    return genres.map(genre => genre.name).join(', ');
  }
}
