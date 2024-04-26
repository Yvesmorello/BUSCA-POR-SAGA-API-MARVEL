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
        
            // Faz a solicitação HTTP para a Marvel API
            const response = await axios.get(apiUrl);

            const charactersData = response.data.data.results;

            const charactersWithoutId = charactersData.map((character: any) => {
                const { _id, ...rest } = character;
                return rest;
            });

            // Salva os personagens no banco de dados MongoDB usando o modelo Mongoose
            const insertedCharacters = await characterSchema.insertMany(charactersWithoutId);

            res.json(insertedCharacters);
        } catch (error) {
            console.error("Erro ao buscar personagens:", error);
            res.status(500).json({ error: "Erro ao buscar personagens" });
        }
    }

    async findAllFromDatabase(req: Request, res: Response) {
        try {
            // Busca todos os personagens salvos no banco de dados MongoDB
            const characters = await characterService.findAll();
            return res.json(characters);
        } catch (error) {
            console.error("Erro ao buscar personagens no banco de dados:", error);
            res.status(500).json({ error: "Erro ao buscar personagens no banco de dados" });
        }
    }

   
    async findByIdFromDataBase(req: Request, res: Response) {
        try {
            const id = req.params.id; // Agora usamos o ID da API fornecido como parâmetro
            const characterFound = await characterService.findByApiId(id); // Use uma função findByApiId para buscar pelo ID da API
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

            // Faz a solicitação HTTP para a Marvel API para buscar o personagem por ID
            const response = await axios.get(apiUrl);

            const characterData = response.data.data.results;

            // Retorna o personagem encontrado
            res.json(characterData);
        } catch (error) {
            console.error("Erro ao buscar personagem por ID:", error);
            res.status(500).json({ error: "Erro ao buscar personagem por ID" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            // ID do personagem fornecido na solicitação
            const characterId = req.params.id;
    
            // Dados atualizados do personagem obtidos da solicitação do cliente
            const updatedCharacterData = req.body;
    
            // Verifica se o ID fornecido é válido
            if (!characterId) {
                return res.status(400).json({ error: "ID de personagem não fornecido" });
            }
    
            // Atualiza os dados do personagem no banco de dados
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
            // Obtém a letra inicial fornecida pelo usuário nos parâmetros da requisição
            const initialLetter = req.params.initialLetter.toUpperCase(); // Converte para maiúscula para garantir consistência
    
            // Busca os personagens cujos nomes começam com a letra fornecida no banco de dados
            const charactersStartingWithLetter = await characterService.findByNameStartingWith(initialLetter);
    
            res.json(charactersStartingWithLetter);
        } catch (error) {
            console.error("Erro ao buscar personagens pela letra inicial:", error);
            res.status(500).json({ error: "Erro ao buscar personagens pela letra inicial" });
        }
    }
    
}

export default new characterController();





