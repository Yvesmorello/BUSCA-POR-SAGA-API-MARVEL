import {Schema, model} from "mongoose"
import { resourceLimits } from "worker_threads";

export const textObjects = new Schema({
    tpe: String,
    language: String,
    text: String
}, {_id:false});

export const urlSchema = new Schema({
    type: String,
    url: String
}, {_id:false});

export const ComicSchema = new Schema({
    resourceURI: String,
    name: String,
}, {_id:false});

export const ComicSchemaType = new Schema({
    resourceURI: String,
    name: String,
    type: String
}, {_id:false});

// Esquema para representar cada série
export const SeriesSchema = new Schema({
    resourceURI: String,
    name: String,
}, {_id:false});

export const dateSchema = new Schema({
    type: String,
    date: String
}, {_id:false});

export const priceSchema = new Schema({
    type: String,
    price: Number
}, {_id:false});

export const thumbnailSchema = new Schema({
    path: String,
    extension: String,
}, {_id:false});

export const imagesSchema = new Schema({
    path: String,
    extension: String
}, {_id:false});

export const creatorsSchema = new Schema({
    availible: Number,
    collectionURI: String,
    items: [ComicSchemaType],
    returned: Number
}, {_id:false});

export const charactersSchema = new Schema({
    availible: Number,
    collectionURI: String,
    items: [ComicSchemaType],
    returned: Number
}, {_id:false});

export const storySchema = new Schema({
    available: Number,
    collectionURI: String,
    items: [ComicSchemaType],
    returned: Number
}, {_id:false});

export const eventSchema = new Schema({
    available: Number,
    collectionURI: String,
    items: [ComicSchema],
    returned: Number
}, {_id:false});


const comicSchema = new Schema({
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
    textObjects: [textObjects],
    resourceURI: String,
    urls: [urlSchema],
    series: [SeriesSchema],
    dates: [dateSchema],
    prices: [priceSchema],
    thumbnail: [thumbnailSchema],
    images: [imagesSchema],
    creators: [creatorsSchema],
    characters: [charactersSchema],
    stories: [storySchema],
    events: [eventSchema],
    publitionDate: Date,
    capaUrl: String
}, {timestamps: true});

export default model("Comics", comicSchema)