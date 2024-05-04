import { comicType } from "./comic.type";
import creatorSchema from "../schema/creator.schema";
import { ThumbnailSchema } from "../schema/creator.schema"; 
import { ComicsDataSchema } from "../schema/creator.schema"; 
import { SeriesSchema } from "../schema/creator.schema"; 
import { StorySchema } from "../schema/creator.schema"; 
import { EventSchema } from "../schema/creator.schema"; 
import { urlSchema } from "../schema/creator.schema"; 

export interface creatorType {
    id: Number,
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
