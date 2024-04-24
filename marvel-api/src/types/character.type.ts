import { urlSchema } from "../schema/comic.schema";
import { textObjects } from "../schema/comic.schema";
import { SeriesSchema } from "../schema/comic.schema";
import { dateSchema } from "../schema/comic.schema";
import { priceSchema } from "../schema/comic.schema";
import { thumbnailSchema } from "../schema/comic.schema";
import { imagesSchema } from "../schema/comic.schema";
import { creatorsSchema } from "../schema/comic.schema";
import { charactersSchema } from "../schema/comic.schema";
import { storySchema } from "../schema/comic.schema";
import { eventSchema } from "../schema/comic.schema";
import { ComicsDataSchema } from "../schema/creator.schema";


export interface characterType{
    _id: null, 
    name: String,
    description: String,
    thumbnail: typeof thumbnailSchema,
    resourceURI: String, // Manter o resourceURI como uma string
    comics: typeof ComicsDataSchema,
    series: typeof SeriesSchema[],
    stories: typeof storySchema[],
    events: typeof eventSchema[],
    urls: typeof urlSchema[],
    imgUrl: String,
}

