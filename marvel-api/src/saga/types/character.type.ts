import { urlSchema } from "../schema/comic.schema";
import { seriesSchema } from "../schema/comic.schema";
import { eventSchema } from "../schema/comic.schema";
import { thumbnailSchema } from "../schema/comic.schema";
import { ComicsDataSchema } from "../schema/creator.schema";
import { storySchema } from "../schema/comic.schema";

export interface characterType{
    _id: null, 
    name: String,
    description: String,
    thumbnail: typeof thumbnailSchema,
    resourceURI: String,
    comics: typeof ComicsDataSchema,
    series: typeof seriesSchema[],
    stories: typeof storySchema[],
    events: typeof eventSchema[],
    urls: typeof urlSchema[],
    imgUrl: String,
}

