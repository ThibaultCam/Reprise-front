import { Media } from "./media";
import { Season } from "./season";

export interface Serie extends Media {
  seasons: Array<Season>;
}