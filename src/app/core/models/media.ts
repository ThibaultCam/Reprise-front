import { Genre } from "./genre";

export interface Media {
  id: string;
  name: string;
  description?: string | null;
  releaseDate: string;
  genres: Array<Genre>;
  imageUrl?: string | null;
  averageRating: number | null;
  userRate: number;
}