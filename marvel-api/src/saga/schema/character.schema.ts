import { Schema, model } from "mongoose";
import { availableParallelism } from "os";

// Esquema para representar cada quadrinho
const ComicSchema = new Schema({
    resourceURI: String,
    name: String,
}, {_id:false});

const ComicSchemaType = new Schema({
    resourceURI: String,
    name: String,
    type: String
}, {_id:false});


// Esquema para representar os dados dos quadrinhos do criador
const ComicsDataSchema = new Schema({
    available: Number,
    collectionURI: String,
    items: [ComicSchema], // Lista de quadrinhos
    returned: Number
}, {_id:false});

// Esquema para representar cada série
const SeriesSchema = new Schema({
    available: Number,
    collectionURI: String,
    items: [ComicSchema],
    returned: Number
}, {_id:false});


// Esquema para representar cada história
const StorySchema = new Schema({
    available: Number,
    collectionURI: String,
    items: [ComicSchemaType],
    returned: Number
}, {_id:false});


// Esquema para representar os eventos
const EventSchema = new Schema({
    available: Number,
    collectionURI: String,
    items: [ComicSchema],
    returned: Number
}, {_id:false});

// Esquema para representar cada URL
const UrlSchema = new Schema({
    type: String,
    url: String
}, {_id:false});

const ThumbnailSchema = new Schema({
    path: String,
    extension: String,
}, {_id:false});

const returned = new Schema({
    returned: Number
})

const characterSchema = new Schema({
    id: String, 
    name: String,
    description: String,
    thumbnail: ThumbnailSchema,
    resourceURI: String, 
    comics: ComicsDataSchema,
    series: [SeriesSchema],
    stories: [StorySchema],
    events: [EventSchema],
    urls: [UrlSchema],
    imgUrl: String,
}, { timestamps: true});

export default model("Character", characterSchema);
