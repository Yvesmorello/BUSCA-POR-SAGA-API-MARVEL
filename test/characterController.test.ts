import app from '../marvel-api/src/app';
import { describe, it, expect } from '@jest/globals'
import * as request from 'supertest'
import characterService from '../marvel-api/src/saga/services/character.service'
import mongoose from 'mongoose';


describe('Testando endpoints de personagens', () => {

    it('Deve inserir um personagem no banco de dados', async () => {
        const characterMock = {
            id:1,
            name: "Spider-Man",
            description: "O heroi do povo!",
            thumbnail: {
                path: "http://example.com/spider-man",
                extension: "jpg"
            },
            resourceURI: "http://example.com/characters/1",
            comics:{
                "available": 103,
		        "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009148/comics",
	        	"items": [
			{
				"resourceURI": "http://gateway.marvel.com/v1/public/comics/43507",
				"name": "A+X (2012) #8"
			},
			{
				"resourceURI": "http://gateway.marvel.com/v1/public/comics/7045",
				"name": "Avengers (1963)"
			},
            ]},

            series: {
                "available": 52,
                "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009148/series",
                "items": [
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/series/16450",
                        "name": "A+X (2012 - 2014)"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/series/1991",
                        "name": "Avengers (1963 - 1996)"
                    }]},

            stories:{
                "available": 115,
                "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009148/stories",
                "items": [
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/stories/4988",
                        "name": "1 of 1",
                        "type": "cover"
                    },
                    {
                        "resourceURI": "http://gateway.marvel.com/v1/public/stories/7866",
                        "name": "Punisher War Journal (2006) #4",
                        "type": "cover"
                    }]},
                    
            events: {
                    "available": 5,
                    "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009148/events",
                    "items": [
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/events/116",
                            "name": "Acts of Vengeance!"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/events/238",
                            "name": "Civil War"
                        }]},

                        urls: [
                            {
                                type: "detail",
                                url: "http://example.com/characters/1/details"
                            },
                        ],
            imgUrl: "http://example.com/spider-man-updated.jpg"
        };

        const response = await request.default(app).post('/characters').send(characterMock);

        expect(response.status).toBe(201);
        expect(response.body.id).toHaveProperty('id');
    });

    it('Deve atualizar um personagem no banco de dados', async () => {

        const updatedCharacterMock = {
            name: "Spider-Man Updated",
            description: "A superhero with updated spider-like abilities.",
            thumbnail: {
                path: "http://example.com/spider-man-updated",
                extension: "jpg"
            },
            resourceURI: "http://example.com/characters/1",
            comics: {
                available: 150,
                collectionURI: "http://example.com/characters/1/comics"
            },
            series: [
                {
                    resourceURI: "http://example.com/series/1",
                    name: "The Amazing Spider-Man Updated"
                }
            ],
            stories: [
                {
                    resourceURI: "http://example.com/stories/1",
                    name: "Spider-Man's Updated Origin Story"
                }
            ],
            events: [
                {
                    resourceURI: "http://example.com/events/1",
                    name: "Updated Spider-Verse"
                }
            ],
            urls: [
                {
                    type: "detail",
                    url: "http://example.com/characters/1/details"
                },
            ],
            imgUrl: "http://example.com/spider-man-updated.jpg"
        };

        const insertResponse = await request.default(app).post('/characters').send(updatedCharacterMock);
        
        const updatedResponse = await request.default(app).put(`/characters/${insertResponse.body.id}`).send(updatedCharacterMock);
        
        expect(updatedResponse.status).toEqual(200);

        const foundUpdatedCharacter = await characterService.findByApiId(insertResponse.body.id);

        expect(foundUpdatedCharacter).toBeDefined();
        expect(foundUpdatedCharacter?.name).toBe(updatedCharacterMock.name);
        expect(foundUpdatedCharacter?.description).toBe(updatedCharacterMock.description);
    });

    it('Deve deletar um personagem do banco de dados', async () => {
        const characterMock = {
            name: "Spider-Man",
            description: "A superhero with spider-like abilities.",
            thumbnail: {
                path: "http://example.com/spider-man",
                extension: "jpg"
            },
            resourceURI: "http://example.com/characters/1",
            comics: {
                available: 100,
                collectionURI: "http://example.com/characters/1/comics"
            },
            series: [
                {
                    resourceURI: "http://example.com/series/1",
                    name: "The Amazing Spider-Man"
                }
            ],
            stories: [
                {
                    resourceURI: "http://example.com/stories/1",
                    name: "Spider-Man's Origin Story"
                }
            ],
            events: [
                {
                    resourceURI: "http://example.com/events/1",
                    name: "Spider-Verse"
                }
            ],
            urls: [
                {
                    type: "detail",
                    url: "http://example.com/characters/1/details"
                },
            ],
            imgUrl: "http://example.com/spider-man.jpg"
        };
    
        const insertionResponse = await request.default(app).post('/characters').send(characterMock);
    
        expect(insertionResponse.status).toEqual(201);
        expect(insertionResponse.body.id).toBeDefined();
    
        const deletionResponse = await request.default(app).delete(`/characters/${insertionResponse.body.id}`);
    
        expect(deletionResponse.status).toEqual(200);
        expect(deletionResponse.body).toEqual({ message: 'Personagem Removido' });
    
        const foundCharacter = await characterService.findByApiId(insertionResponse.body.id);
    
        expect(foundCharacter).toBeNull();
    });
 });

afterAll(async () => {
    await mongoose.disconnect();
  });
  
