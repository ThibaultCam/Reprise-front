import { Genre } from "./genre";

export interface Film {
  id: string;
  name: string;
  description?: string | null;
  releaseDate: string;
  durationMinutes: number;
  genres: Array<Genre>;
  imageUrl?: string | null;
}