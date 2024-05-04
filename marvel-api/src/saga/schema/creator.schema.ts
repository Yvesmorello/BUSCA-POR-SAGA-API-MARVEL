import { Schema, model } from "mongoose";

// Esquema para representar cada quadrinho
export const ComicSchema = new Schema({
    resourceURI: String,
    name: String,
},{_id:false});

export const ComicSchemaType = new Schema({
    resourceURI: String,
    name: String,
    type: String
}, {_id:false});


// Esquema para representar os dados dos quadrinhos do criador
export const ComicsDataSchema = new Schema({
    available: Number,
    collectionURI: String,
    items: [ComicSchema], 
    returned: Number
}, {_id:false});

// Esquema para representar cada série
export const SeriesSchema = new Schema({
    available: Number,
    collectionURI: String,
    items: [ComicSchema],
    returned: Number
}, {_id:false});


// Esquema para representar cada história
export const StorySchema = new Schema({
    available: Number,
    collectionURI: String,
    items: [ComicSchemaType],
    returned: Number
}, {_id:false});


// Esquema para representar os eventos
export const EventSchema = new Schema({
    available: Number,
    collectionURI: String,
    items: [ComicSchema],
    returned: Number
}, {_id:false});

// Esquema para representar cada URL
export const urlSchema = new Schema({
    type: String,
    url: String
}, {_id:false});

export const ThumbnailSchema = new Schema({
    path: String,
    extension: String,
}, {_id:false});

export const returned = new Schema({
    returned: Number
})

const creatorSchema = new Schema ({
    id: Number,
    firstName: String,
    middleName: String,
    lastName: String,
    suffix: String,
    fullName: String,
    modified: String,
    thumbnail: ThumbnailSchema,
    resourceURI: String, 
    comics: ComicsDataSchema,
    series: [SeriesSchema],
    stories: [StorySchema],
    events: [EventSchema],
    urls: [urlSchema],
    function: String,
}, { timestamps: true});

export default model("Creator", creatorSchema);




















// import { Schema, model } from "mongoose";

// const ThumbnailSchema = new Schema({
//     path: String,
//     extension: String,
// });

// const ResourceURISchema = new Schema({
//     comics: Array[avalible: Number, collectionURI: ],
//     available: Number
// });

// const creatorSchema = new Schema ({
//     id: String,
//     firstName: String,
//     lastName: String,
//     fullName: String,
//     modified: String,
//     thumbnail: ThumbnailSchema,
//     //resourceURI: ResourceURISchema, // Campo resourceURI descomentado e configurado
//     function: String,
//    // comicsParticipation: Array
// }, { timestamps: true });

// export default model("Creator", creatorSchema);
