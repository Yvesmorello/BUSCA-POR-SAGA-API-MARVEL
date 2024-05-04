import { urlSchema } from "../schema/comic.schema";
import { textObjects } from "../schema/comic.schema";
import { seriesSchema } from "../schema/comic.schema";
import { dateSchema } from "../schema/comic.schema";
import { priceSchema } from "../schema/comic.schema";
import { thumbnailSchema } from "../schema/comic.schema";
import { imagesSchema } from "../schema/comic.schema";
import { creatorsSchema } from "../schema/comic.schema";
import { charactersSchema } from "../schema/comic.schema";
import { storySchema } from "../schema/comic.schema";
import { eventSchema } from "../schema/comic.schema";



export interface comicType {
    id: Number,
    digitalId: Number,
    title: String,
    issueNumber: Number,
    variantDescription: String,
    description: String,
    modified: String,
    isbn: String,
    upc: String,
    format: String,
    pageCount: Number,
    textObjects: typeof textObjects[],
    resourceURI: String,
    urls: typeof urlSchema[],
    series: typeof seriesSchema[],
    dates: typeof dateSchema[],
    prices: typeof priceSchema[],
    thumbnail: typeof thumbnailSchema[],
    images: typeof imagesSchema[],
    creators: typeof creatorsSchema[],
    characters: typeof charactersSchema[],
    stories: typeof storySchema[],
    events: typeof eventSchema[],
    publitionDate: Date,
    capaUrl: String 
}