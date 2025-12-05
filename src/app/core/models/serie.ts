import { Genre } from "./genre";
import { Season } from "./season";

export interface Serie {
  id: string;
  name: string;
  description?: string | null;
  releaseDate: string;
  seasons: Array<Season>;
  genres: Array<Genre>;
  imageUrl?: string | null;
  averageRating: number | null;
}