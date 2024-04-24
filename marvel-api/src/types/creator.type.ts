import { comicType } from "./comic.type";
import creatorSchema from "../schema/creator.schema";
import { ThumbnailSchema } from "../schema/creator.schema"; // Importe o esquema da miniatura
import { ComicsDataSchema } from "../schema/creator.schema"; // Importe o esquema de dados dos quadrinhos
import { SeriesSchema } from "../schema/creator.schema"; // Importe o esquema da série
import { StorySchema } from "../schema/creator.schema"; // Importe o esquema da história
import { EventSchema } from "../schema/creator.schema"; // Importe o esquema do evento
import { urlSchema } from "../schema/creator.schema"; // Importe o esquema da URL

export interface creatorType {
    id: number,
    firstName: string,
    middleName: string,
    lastName: string,
    suffix: string,
    fullName: string,
    modified: string,
    thumbnail: typeof ThumbnailSchema,
    resourceURI: string,
    comics: typeof ComicsDataSchema,
    series: typeof SeriesSchema[],
    stories: typeof StorySchema[],
    events: typeof EventSchema[],
    urls: typeof urlSchema[],
    function: string,
}
