import app from '../app';
import { describe, it, expect } from '@jest/globals';
import characterSchema from '../marvel-api/src/schema/character.schema';
import request from 'supertest'; 

describe('Testando endpoints de characters', () => {
    it.skip('Deve inserir um personagem no banco de dados', async () => {
        const characterMock = {
            name: "Homem de Ferro",
            description: "Genius, billionaire, playboy, philanthropist",
            comics: {
                available: 4563,
                collectionURI: "http://gateway.marvel.com/v1/public/characters/1009368/comics",
                items: []
            }
        };

        const response = await request(app).post('/characters').send(characterMock);
        const foundCharacter = await characterSchema.findById(response.body._id);

        expect(response.status).toEqual(201);
        expect(response.body._id).toBeDefined();
        expect(characterMock.name).toBe(foundCharacter?.name);
        expect(characterMock.description).toBe(foundCharacter?.description);
        expect(characterMock.comics).toBe(foundCharacter?.comics);
    });

    it('Deve recuperar todos os personagens do banco de dados', async () => {
        const response = await request(app).get('/characters');
        const totalCharactersOnDatabase = await characterSchema.countDocuments();

        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(totalCharactersOnDatabase);
    });
});
