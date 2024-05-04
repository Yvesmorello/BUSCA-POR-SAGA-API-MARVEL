import app from '../marvel-api/src/app';
import { describe, it, expect } from '@jest/globals'
import comicService from '../marvel-api/src/saga/services/comic.service';
import * as request from 'supertest'

describe('Testando endpoints de quadrinhos', () => {

    it('Deve inserir um quadrinho no banco de dados', async () => {
        const comicMock = {
                "id": 22582,
                "digitalId": 0,
                "title": "Civil War (Hardcover)",
                "issueNumber": 0,
                "variantDescription": "",
                "description": "",
                "modified": "2013-03-18T15:33:12-0400",
                "isbn": "978-0-7851-2178-7",
                "upc": "5960612178-00111",
                "format": "Hardcover",
                "pageCount": 512,
                "textObjects": [
                    {
                    "language": "en-us",
                    "text": "The landscape of the Marvel Universe is changing, and it's time to choose: Whose side are you on? A conflict has been brewing from more than a year, threatening to pit friend against friend, brother against brother - and all it will take is a single misstep to cost thousands their lives and ignite the fuse! As the war claims its first victims, no one is safe as teams, friendships and families begin to fall apart. The crossover that rewrites the rules, Civil War stars Spider-Man, the New Avengers, the Fantastic Four, the X-Men and the entirety of the Marvel pantheon! Collecting CIVIL WAR #1-7, MARVEL SPOTLIGHT: CIVIL WAR and CIVIL WAR SCRIPT BOOK.\r<br>Rated T+ ...$39.99\r<br>ISBN: 978-0-7851-2178-7\r<br>Trim size: oversized\r<br>"
                    }
                ],
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/22582",
                "urls": [
                    {
                        "type": "detail",
                        "url": "http://marvel.com/comics/collection/22582/civil_war_hardcover?utm_campaign=apiRef&utm_source=d30c9fc66d3d6906df988cffc78ae86a"
                    }
                ],
                "series": [
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/series/6208",
                        "name": "Civil War (2006 - Present)"
                    }
                ],
                "dates": [
                    {
                        "type": "onsaleDate",
                        "date": "2029-12-31T00:00:00-0500"
                    },
                    {
                        "type": "focDate",
                        "date": "2008-10-09T00:00:00-0400"
                    }
                ],
                "prices": [
                    {
                        "type": "printPrice",
                        "price": 39.99
                    }
                ],
                "thumbnail": [ 
                    {
                        "path": "http://i.annihil.us/u/prod/marvel/i/mg/8/c0/51dda501724ed",
                        "extension": "jpg"
                    }
                ],
                "images": [
                    {
                        "path": "http://i.annihil.us/u/prod/marvel/i/mg/8/c0/51dda501724ed",
                        "extension": "jpg"
                    },
                ],
                "creators": [
                    {
                        "collectionURI": "http://gateway.marvel.com/v1/public/comics/22582/creators",
                        "items": [],
                        "returned": 0
                    }
                ],
                "characters": [
                    {
                        "collectionURI": "http://gateway.marvel.com/v1/public/comics/22582/characters",
                        "items": [],
                        "returned": 0
                    }
                ],
                "stories": [
                    {
                        "available": 1,
                        "collectionURI": "http://gateway.marvel.com/v1/public/comics/22582/events",
                        "items": [
                            {
                                "resourceURI": "http://gateway.marvel.com/v1/public/events/238",
                                "name": "Civil War"
                            }
                        ],
                        "returned": 1
                    }
                     ],

                "events": [
                    {
                        "available": 1,
                        "collectionURI": "http://gateway.marvel.com/v1/public/comics/22582/events",
                        "items": [
                            {
                                "resourceURI": "http://gateway.marvel.com/v1/public/events/238",
                                "name": "Civil War"
                            }
                        ],
                        "returned": 1
                    }
                ],
            };
            
        const response = await request.default(app).post('/comics').send(comicMock);

        expect(response.status).toBe(201);
        expect(response.body.id).toHaveProperty('id');
    });

    it('Deve atualizar um quadrinho no banco de dados', async () => {

        const updatedComicMock = {
                "title": "Civil War (Hardcover)",
                "issueNumber": 0,
                "variantDescription": "",
                "description": "descrição atualizada",
                "modified": "2013-03-18T15:33:12-0400",
                "isbn": "978-0-7851-2178-7",
                "upc": "5960612178-00111",
                "format": "Hardcover",
                "pageCount": 200,
                "textObjects": [
                    {
                        "language": "en-us",
                        "text": "The landscape of the Marvel Universe is changing, and it's time to choose: Whose side are you on? A conflict has been brewing from more than a year, threatening to pit friend against friend, brother against brother - and all it will take is a single misstep to cost thousands their lives and ignite the fuse! As the war claims its first victims, no one is safe as teams, friendships and families begin to fall apart. The crossover that rewrites the rules, Civil War stars Spider-Man, the New Avengers, the Fantastic Four, the X-Men and the entirety of the Marvel pantheon! Collecting CIVIL WAR #1-7, MARVEL SPOTLIGHT: CIVIL WAR and CIVIL WAR SCRIPT BOOK.\r<br>Rated T+ ...$39.99\r<br>ISBN: 978-0-7851-2178-7\r<br>Trim size: oversized\r<br>"
                    }
                ],
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/22582",
                "urls": [
                    {
                        "type": "detail",
                        "url": "http://marvel.com/comics/collection/22582/civil_war_hardcover?utm_campaign=apiRef&utm_source=d30c9fc66d3d6906df988cffc78ae86a"
                    }
                ],
                "series": [
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/series/6208",
                        "name": "Civil War (2006 - Present)"
                    }
                ],
                "dates": [
                    {
                        "type": "onsaleDate",
                        "date": "2029-12-31T00:00:00-0500"
                    },
                    {
                        "type": "focDate",
                        "date": "2008-10-09T00:00:00-0400"
                    }
                ],
                "prices": [
                    {
                        "type": "printPrice",
                        "price": 39.99
                    }
                ],
                "thumbnail": [],
                "images": [
                    {
                        "path": "http://i.annihil.us/u/prod/marvel/i/mg/8/c0/51dda501724ed",
                        "extension": "jpg"
                    },
                    {
                        "path": "http://i.annihil.us/u/prod/marvel/i/mg/c/d0/4bb67e65e44df",
                        "extension": "jpg"
                    }
                ],
                "creators": [
                    {
                        "collectionURI": "http://gateway.marvel.com/v1/public/comics/22582/creators",
                        "items": [],
                        "returned": 0
                    }
                ],
                "characters": [
                    {
                        "collectionURI": "http://gateway.marvel.com/v1/public/comics/22582/characters",
                        "items": [],
                        "returned": 0
                    }
                ],
                "stories": [
                    {
                        "available": 2,
                        "collectionURI": "http://gateway.marvel.com/v1/public/comics/22582/stories",
                        "items": [
                            {
                                "resourceURI": "http://gateway.marvel.com/v1/public/stories/50048",
                                "name": "Civil War 1-7; Marvel Spotlight Civil War; Civil War Script Book",
                                "type": "cover"
                            },
                        ],
                        "returned": 1
                    }
                ],
                "events": [
                    {
                        "available": 1,
                        "collectionURI": "http://gateway.marvel.com/v1/public/comics/22582/events",
                        "items": [
                            {
                                "resourceURI": "http://gateway.marvel.com/v1/public/events/238",
                                "name": "Civil War"
                            }
                        ],
                        "returned": 1
                    }
                ],
              
            }
        

        const insertResponse = await request.default(app).post('/comics').send(updatedComicMock);
        
        const updatedResponse = await request.default(app).put(`/characters/${insertResponse.body.id}`).send(updatedComicMock);
        
        expect(updatedResponse.status).toEqual(200);

        const foundUpdatedComic = await comicService.findByApiId(insertResponse.body.id);

        expect(foundUpdatedComic).toBeDefined();
        expect(foundUpdatedComic?.title).toBe(updatedComicMock.title);
        expect(foundUpdatedComic?.description).toBe(updatedComicMock.description);
        expect(foundUpdatedComic?.pageCount).toBe(updatedComicMock.pageCount);
        expect(foundUpdatedComic?.textObjects).toBe(updatedComicMock.textObjects);
        expect(foundUpdatedComic?.series).toBe(updatedComicMock.series);
        expect(foundUpdatedComic?.dates).toBe(updatedComicMock.dates);
        expect(foundUpdatedComic?.prices).toBe(updatedComicMock.prices);
        expect(foundUpdatedComic?.stories).toBe(updatedComicMock.stories);
        expect(foundUpdatedComic?.events).toBe(updatedComicMock.events);
    });

    it('Deve deletar um quadirnho do banco de dados', async () => {
        const comicMock = {
            "title": "Civil War (Hardcover)",
            "issueNumber": 0,
            "variantDescription": "",
            "description": "descrição atualizada",
            "modified": "2013-03-18T15:33:12-0400",
            "isbn": "978-0-7851-2178-7",
            "upc": "5960612178-00111",
            "format": "Hardcover",
            "pageCount": 200,
            "textObjects": [
                {
                    "language": "en-us",
                    "text": "The landscape of the Marvel Universe is changing, and it's time to choose: Whose side are you on? A conflict has been brewing from more than a year, threatening to pit friend against friend, brother against brother - and all it will take is a single misstep to cost thousands their lives and ignite the fuse! As the war claims its first victims, no one is safe as teams, friendships and families begin to fall apart. The crossover that rewrites the rules, Civil War stars Spider-Man, the New Avengers, the Fantastic Four, the X-Men and the entirety of the Marvel pantheon! Collecting CIVIL WAR #1-7, MARVEL SPOTLIGHT: CIVIL WAR and CIVIL WAR SCRIPT BOOK.\r<br>Rated T+ ...$39.99\r<br>ISBN: 978-0-7851-2178-7\r<br>Trim size: oversized\r<br>"
                }
            ],
            "resourceURI": "http://gateway.marvel.com/v1/public/comics/22582",
            "urls": [
                {
                    "type": "detail",
                    "url": "http://marvel.com/comics/collection/22582/civil_war_hardcover?utm_campaign=apiRef&utm_source=d30c9fc66d3d6906df988cffc78ae86a"
                }
            ],
            "series": [
                {
                    "resourceURI": "http://gateway.marvel.com/v1/public/series/6208",
                    "name": "Civil War (2006 - Present)"
                }
            ],
            "dates": [
                {
                    "type": "onsaleDate",
                    "date": "2029-12-31T00:00:00-0500"
                },
                {
                    "type": "focDate",
                    "date": "2008-10-09T00:00:00-0400"
                }
            ],
            "prices": [
                {
                    "type": "printPrice",
                    "price": 39.99
                }
            ],
            "thumbnail": [],
            "images": [
                {
                    "path": "http://i.annihil.us/u/prod/marvel/i/mg/8/c0/51dda501724ed",
                    "extension": "jpg"
                },
                {
                    "path": "http://i.annihil.us/u/prod/marvel/i/mg/c/d0/4bb67e65e44df",
                    "extension": "jpg"
                }
            ],
            "creators": [
                {
                    "collectionURI": "http://gateway.marvel.com/v1/public/comics/22582/creators",
                    "items": [],
                    "returned": 0
                }
            ],
            "characters": [
                {
                    "collectionURI": "http://gateway.marvel.com/v1/public/comics/22582/characters",
                    "items": [],
                    "returned": 0
                }
            ],
            "stories": [
                {
                    "available": 2,
                    "collectionURI": "http://gateway.marvel.com/v1/public/comics/22582/stories",
                    "items": [
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/stories/50048",
                            "name": "Civil War 1-7; Marvel Spotlight Civil War; Civil War Script Book",
                            "type": "cover"
                        },
                    ],
                    "returned": 1
                }
            ],
            "events": [
                {
                    "available": 1,
                    "collectionURI": "http://gateway.marvel.com/v1/public/comics/22582/events",
                    "items": [
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/events/238",
                            "name": "Civil War"
                        }
                    ],
                    "returned": 1
                }
            ],
          
        };
    
        const insertionResponse = await request.default(app).post('/comics').send(comicMock);
    
        expect(insertionResponse.status).toEqual(201);
        expect(insertionResponse.body.id).toBeDefined();
    
        const deletionResponse = await request.default(app).delete(`/comics/${insertionResponse.body.id}`);
    
        expect(deletionResponse.status).toEqual(200);
        expect(deletionResponse.body).toEqual({ message: 'Quadrinho Removido' });
    
        const foundComic = await comicService.findByApiId(insertionResponse.body.id);
    
        expect(foundComic).toBeNull();
    });
}
    
);
