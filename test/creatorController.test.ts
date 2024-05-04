import app from '../marvel-api/src/app';
import { describe, it, expect } from '@jest/globals'
import * as request from 'supertest'
import creatorService from '../marvel-api/src/saga/services/creator.service';
import mongoose from 'mongoose';


describe('Testando endpoints de criadores', () => {

    it('Deve inserir um criador no banco de dados', async () => {
        const creatorMock = {
                    "firstName": "Comicraft",
                    "middleName": "",
                    "lastName": "",
                    "suffix": "",
                    "fullName": "Comicraft",
                    "modified": "2018-07-24T15:54:47-0400",
                    "thumbnail": {
                        "path": "http://i.annihil.us/u/prod/marvel/i/mg/6/90/4bc381514ef59",
                        "extension": "jpg"
                    },
                    "resourceURI": "http://gateway.marvel.com/v1/public/creators/807",
                    "comics": {
                        "available": 338,
                        "collectionURI": "http://gateway.marvel.com/v1/public/creators/807/comics",
                        "items": [
                            {
                                "resourceURI": "http://gateway.marvel.com/v1/public/comics/17731",
                                "name": "Amazing X-Men (1995) #1"
                            },
                            {
                                "resourceURI": "http://gateway.marvel.com/v1/public/comics/17732",
                                "name": "Amazing X-Men (1995) #2"
                            },
                            {
                                "resourceURI": "http://gateway.marvel.com/v1/public/comics/17733",
                                "name": "Amazing X-Men (1995) #3"
                            }
                        ],
                        "returned": 3
                    },
                    "series": [
                        {
                            "available": 98,
                            "collectionURI": "http://gateway.marvel.com/v1/public/creators/807/series",
                            "items": [
                                {
                                    "resourceURI": "http://gateway.marvel.com/v1/public/series/3618",
                                    "name": "Amazing X-Men (1995)"
                                },
                                {
                                    "resourceURI": "http://gateway.marvel.com/v1/public/series/3619",
                                    "name": "Astonishing X-Men (1995)"
                                },
                                {
                                    "resourceURI": "http://gateway.marvel.com/v1/public/series/354",
                                    "name": "Avengers (1998 - 2004)"
                                },
                                {
                                    "resourceURI": "http://gateway.marvel.com/v1/public/series/3621",
                                    "name": "Avengers (1996 - 1997)"
                                },
                                {
                                    "resourceURI": "http://gateway.marvel.com/v1/public/series/1737",
                                    "name": "Avengers Assemble Vol. 3 (2006)"
                                },
                            ],
                            "returned": 5
                        }
                    ],
                    "stories": [
                        {
                            "available": 387,
                            "collectionURI": "http://gateway.marvel.com/v1/public/creators/807/stories",
                            "items": [
                                {
                                    "resourceURI": "http://gateway.marvel.com/v1/public/stories/4348",
                                    "name": "FANTASTIC FOUR: FIRST FAMILY (2006) #5",
                                    "type": "cover"
                                },
                                {
                                    "resourceURI": "http://gateway.marvel.com/v1/public/stories/4350",
                                    "name": "FANTASTIC FOUR: FIRST FAMILY (2006) #6",
                                    "type": "cover"
                                },
                                {
                                    "resourceURI": "http://gateway.marvel.com/v1/public/stories/5180",
                                    "name": "1 of 8 - 8XLS",
                                    "type": "interiorStory"
                                },
                                {
                                    "resourceURI": "http://gateway.marvel.com/v1/public/stories/5182",
                                    "name": "3 of 8 - 8XLS",
                                    "type": "interiorStory"
                                },
                                {
                                    "resourceURI": "http://gateway.marvel.com/v1/public/stories/5184",
                                    "name": "4 of 8 - 8XLS",
                                    "type": "interiorStory"
                                }
                            ],
                            "returned": 5
                        }
                    ],
                    "events": [
                        {
                            "available": 10,
                            "collectionURI": "http://gateway.marvel.com/v1/public/creators/807/events",
                            "items": [
                                {
                                    "resourceURI": "http://gateway.marvel.com/v1/public/events/59",
                                    "name": "Shadowland"
                                },
                                {
                                    "resourceURI": "http://gateway.marvel.com/v1/public/events/273",
                                    "name": "Siege"
                                }
                            ],
                            "returned": 2
                        }
                    ],
                    "urls": [
                        {
                            "type": "detail",
                            "url": "http://marvel.com/comics/creators/807/comicraft?utm_campaign=apiRef&utm_source=d30c9fc66d3d6906df988cffc78ae86a"
                        }
                    ],
                }

        const response = await request.default(app).post('/creators').send(creatorMock);

        expect(response.status).toBe(201);
        expect(response.body.id).toHaveProperty('id');
    });




    it('Deve atualizar um Criador no banco de dados', async () => {

        const updatedcreatorMock = {
            "firstName": "Mike",
            "middleName": "",
            "lastName": "Bill",
            "suffix": "",
            "fullName": "Mike bill",
            "modified": "2018-07-24T15:54:47-0400",
            "thumbnail": {
                "path": "http://i.annihil.us/u/prod/marvel/i/mg/6/90/4bc381514ef59",
                "extension": "jpg"
            },
            "resourceURI": "http://gateway.marvel.com/v1/public/creators/807",
            "comics": {
                "available": 338,
                "collectionURI": "http://gateway.marvel.com/v1/public/creators/807/comics",
                "items": [
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/comics/17731",
                        "name": "Amazing X-Men (1995) #1"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/comics/17732",
                        "name": "Amazing X-Men (1995) #2"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/comics/17733",
                        "name": "Amazing X-Men (1995) #3"
                    }
                ],
                "returned": 3
            },
            "series": [
                {
                    "available": 98,
                    "collectionURI": "http://gateway.marvel.com/v1/public/creators/807/series",
                    "items": [
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/series/3618",
                            "name": "Amazing X-Men (1995)"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/series/3619",
                            "name": "Astonishing X-Men (1995)"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/series/354",
                            "name": "Avengers (1998 - 2004)"
                        },
                    ],
                    "returned": 2
                }
            ],
            "stories": [
                {
                    "available": 387,
                    "collectionURI": "http://gateway.marvel.com/v1/public/creators/807/stories",
                    "items": [
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/stories/4348",
                            "name": "FANTASTIC FOUR: FIRST FAMILY (2006) #5",
                            "type": "cover"
                        }
                    ],
                    "returned": 1
                }
            ],
            "events": [
                {
                    "available": 10,
                    "collectionURI": "http://gateway.marvel.com/v1/public/creators/807/events",
                    "items": [
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/events/59",
                            "name": "Shadowland"
                        }
                    ],
                    "returned": 1
                }
            ],
            "urls": [],
        };

        const insertResponse = await request.default(app).post('/creators').send(updatedcreatorMock);
        
        const updatedResponse = await request.default(app).put(`/creators/${insertResponse.body.id}`).send(updatedcreatorMock);
        
        expect(updatedResponse.status).toEqual(200);

        const foundUpdatedCreator = await creatorService.findByApiId(insertResponse.body.id);

        expect(foundUpdatedCreator).toBeDefined();
        expect(foundUpdatedCreator?.firstName).toBe(updatedcreatorMock.firstName);
        expect(foundUpdatedCreator?.lastName).toBe(updatedcreatorMock.lastName);
        expect(foundUpdatedCreator?.comics).toBe(updatedcreatorMock.comics);
        expect(foundUpdatedCreator?.series).toBe(updatedcreatorMock.series);
        expect(foundUpdatedCreator?.stories).toBe(updatedcreatorMock.stories);
        expect(foundUpdatedCreator?.events).toBe(updatedcreatorMock.events);
    });

    it('Deve deletar um Criador do banco de dados', async () => {
        const creatorMock = {
            "firstName": "Mike",
            "middleName": "",
            "lastName": "Bill",
            "suffix": "",
            "fullName": "Mike bill",
            "modified": "2018-07-24T15:54:47-0400",
            "thumbnail": {
                "path": "http://i.annihil.us/u/prod/marvel/i/mg/6/90/4bc381514ef59",
                "extension": "jpg"
            },
            "resourceURI": "http://gateway.marvel.com/v1/public/creators/807",
            "comics": {
                "available": 338,
                "collectionURI": "http://gateway.marvel.com/v1/public/creators/807/comics",
                "items": [
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/comics/17731",
                        "name": "Amazing X-Men (1995) #1"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/comics/17732",
                        "name": "Amazing X-Men (1995) #2"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/comics/17733",
                        "name": "Amazing X-Men (1995) #3"
                    }
                ],
                "returned": 3
            },
            "series": [
                {
                    "available": 98,
                    "collectionURI": "http://gateway.marvel.com/v1/public/creators/807/series",
                    "items": [
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/series/3618",
                            "name": "Amazing X-Men (1995)"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/series/3619",
                            "name": "Astonishing X-Men (1995)"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/series/354",
                            "name": "Avengers (1998 - 2004)"
                        },
                    ],
                    "returned": 2
                }
            ],
            "stories": [
                {
                    "available": 387,
                    "collectionURI": "http://gateway.marvel.com/v1/public/creators/807/stories",
                    "items": [
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/stories/4348",
                            "name": "FANTASTIC FOUR: FIRST FAMILY (2006) #5",
                            "type": "cover"
                        }
                    ],
                    "returned": 1
                }
            ],
            "events": [
                {
                    "available": 10,
                    "collectionURI": "http://gateway.marvel.com/v1/public/creators/807/events",
                    "items": [
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/events/59",
                            "name": "Shadowland"
                        }
                    ],
                    "returned": 1
                }
            ],
            "urls": [],
        };
    
        const insertionResponse = await request.default(app).post('/creators').send(creatorMock);
    
        expect(insertionResponse.status).toEqual(201);
        expect(insertionResponse.body.id).toBeDefined();
    
        const deletionResponse = await request.default(app).delete(`/creators/${insertionResponse.body.id}`);
    
        expect(deletionResponse.status).toEqual(200);
        expect(deletionResponse.body).toEqual({ message: 'Criador Removido' });
    
        const foundCreator = await creatorService.findByApiId(insertionResponse.body.id);
    
        expect(foundCreator).toBeNull();
    });
 });

afterAll(async () => {
    await mongoose.disconnect();
  });
  
