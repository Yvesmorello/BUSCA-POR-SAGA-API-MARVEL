import { Request, Response } from "express";
import mongoose from "mongoose";
import characterService from "../services/character.service";
import characterSchema from "../schema/character.schema";
import axios from "axios";

class characterController {

    
    async create(req: Request, res: Response) {
        try {
            const characterCreated = await characterService.create(req.body);
            res.status(201).json(characterCreated);
        } catch (error) {
            console.error("Erro ao criar personagem:", error);
            res.status(500).json({ error: "Erro ao criar personagem" });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const apiUrl = `http://gateway.marvel.com/v1/public/events/238/characters?&ts=1&apikey=d30c9fc66d3d6906df988cffc78ae86a&hash=41adcf82f191215ea4eee5854c9c4a7f`;
        
            const response = await axios.get(apiUrl);

            const charactersData = response.data.data.results;

            const charactersWithoutId = charactersData.map((character: any) => {
                const { _id, ...rest } = character;
                return rest;
            });

            const insertedCharacters = await characterSchema.insertMany(charactersWithoutId);

            res.json(insertedCharacters);
        } catch (error) {
            console.error("Erro ao buscar personagens:", error);
            res.status(500).json({ error: "Erro ao buscar personagens" });
        }
    }

    async findAllFromDatabase(req: Request, res: Response) {
        try {
            const characters = await characterService.findAll();
            return res.json(characters);
        } catch (error) {
            console.error("Erro ao buscar personagens no banco de dados:", error);
            res.status(500).json({ error: "Erro ao buscar personagens no banco de dados" });
        }
    }

   
    async findByIdFromDataBase(req: Request, res: Response) {
        try {
            const id = req.params.id; 
            const characterFound = await characterService.findByApiId(id);
            if (!characterFound) {
                return res.status(404).json({ error: "Personagem não encontrado" });
            }
            return res.json(characterFound);
        } catch (error) {
            console.error("Erro ao buscar personagem por ID da API:", error);
            return res.status(500).json({ error: "Erro ao buscar personagem por ID da API" });
        }
    }
    
    async findById(req: Request, res: Response) {
        try {
            const characterId = req.params.id;
            const apiUrl = `http://gateway.marvel.com/v1/public/characters/${characterId}?&ts=1&apikey=d30c9fc66d3d6906df988cffc78ae86a&hash=41adcf82f191215ea4eee5854c9c4a7f`;

            const response = await axios.get(apiUrl);

            const characterData = response.data.data.results;

            res.json(characterData);
        } catch (error) {
            console.error("Erro ao buscar personagem por ID:", error);
            res.status(500).json({ error: "Erro ao buscar personagem por ID" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const characterId = req.params.id;
    
            const updatedCharacterData = req.body;
    
            if (!characterId) {
                return res.status(400).json({ error: "ID de personagem não fornecido" });
            }
    
            const characterUpdated = await characterService.update(characterId, updatedCharacterData);
    
            res.json(characterUpdated);
        } catch (error) {
            console.error("Erro ao atualizar personagem:", error);
            res.status(500).json({ error: "Erro ao atualizar personagem" });
        }
    }
    
    async delete(req: Request, res: Response) {
        const deleteMessage = await characterService.delete(req.params.id)
        return res.json(deleteMessage)
    }

    async findCharactersByInitialLetter(req: Request, res: Response) {
        try {
            const initialLetter = req.params.initialLetter.toUpperCase();  
    
            const charactersStartingWithLetter = await characterService.findByNameStartingWith(initialLetter);
    
            res.json(charactersStartingWithLetter);
        } catch (error) {
            console.error("Erro ao buscar personagens pela letra inicial:", error);
            res.status(500).json({ error: "Erro ao buscar personagens pela letra inicial" });
        }
    }

    async findSeriesByCharacterApiId(req: Request, res: Response) {
        try {
            const characterApiId = req.params.characterApiId;
            const series = await characterService.findSeriesByCharacterApiId(characterApiId);
            res.json({ series });
        } catch (error) {
            console.error("Erro ao buscar séries do personagem:", error);
            res.status(500).json({ error: "Erro ao buscar séries do personagem" });
        }
    }
    
}

export default new characterController();





