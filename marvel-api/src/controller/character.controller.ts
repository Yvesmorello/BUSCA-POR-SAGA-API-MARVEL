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
            const characterFinded = await characterService.findByApiId(id); // Use uma função findByApiId para buscar pelo ID da API
            if (!characterFinded) {
                return res.status(404).json({ error: "Personagem não encontrado" });
            }
            return res.json(characterFinded);
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
    
}


export default new characterController();




/*
import { Request, Response } from "express";
import axios from "axios";

class personagemController {

    async create(req: Request, res: Response) {
        try {
            // Método não aplicável para a API da Marvel, pois não podemos criar personagens na API
            res.status(501).json({ error: "Operação 'create' não suportada para personagens na API da Marvel" });
        } catch (error) {
            console.error("Erro ao criar personagem:", error);
            res.status(500).json({ error: "Erro ao criar personagem" });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            // Fazer uma solicitação à API da Marvel para buscar os personagens da saga Civil War
            const response = await axios.get("http://gateway.marvel.com/v1/public/characters", {
                params: {
                    name: "Civil War",
                    ts: 1,
                    apikey: "d30c9fc66d3d6906df988cffc78ae86a",
                    hash: "41adcf82f191215ea4eee5854c9c4a7f"
                }
            });

            // Extrair os dados relevantes da resposta
            const personagens = response.data.data.results;

            // Retornar os personagens encontrados como resposta
            res.json(personagens);
        } catch (error) {
            console.error("Erro ao buscar personagens:", error);
            res.status(500).json({ error: "Erro ao buscar personagens" });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            // Obter o ID do personagem da solicitação
            const personagemId = req.params.id;

            // Fazer uma solicitação à API da Marvel para buscar o personagem pelo ID
            const response = await axios.get(`http://gateway.marvel.com/v1/public/characters/${personagemId}`, {
                params: {
                    ts: 1,
                    apikey: "d30c9fc66d3d6906df988cffc78ae86a",
                    hash: "41adcf82f191215ea4eee5854c9c4a7f"
                }
            });

            // Extrair os dados relevantes da resposta
            const personagem = response.data.data.results[0]; // Assumindo que o primeiro resultado é o personagem com o ID especificado

            // Retornar o personagem encontrado como resposta
            res.json(personagem);
        } catch (error) {
            console.error("Erro ao buscar personagem por ID:", error);
            res.status(500).json({ error: "Erro ao buscar personagem por ID" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            // Método não aplicável para a API da Marvel, pois não podemos atualizar personagens na API
            res.status(501).json({ error: "Operação 'update' não suportada para personagens na API da Marvel" });
        } catch (error) {
            console.error("Erro ao atualizar personagem:", error);
            res.status(500).json({ error: "Erro ao atualizar personagem" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            // Método não aplicável para a API da Marvel, pois não podemos excluir personagens na API
            res.status(501).json({ error: "Operação 'delete' não suportada para personagens na API da Marvel" });
        } catch (error) {
            console.error("Erro ao excluir personagem:", error);
            res.status(500).json({ error: "Erro ao excluir personagem" });
        }
    }
}

export default new personagemController();









/*
import { Request, Response } from "express";
import personagemService from "../services/personagem.service";

class personagemController{

    async create(req: Request, res: Response){
        const personagemCriado = await personagemService.create(req.body)
        res.status(201)
        return res.json(personagemCriado);
    }

    async findAll(req: Request, res: Response){
        const personagemEncontrado = await personagemService.findAll()
        return res.json(personagemEncontrado);
    }

    async findById(req: Request, res: Response){
        const personagemEncontrado = await personagemService.findById(req.params.id)
        return res.json(personagemEncontrado);
    }

    async update(req: Request, res: Response){
        const personagemAtualizado = await personagemService.update(req.params.id, req.body)
        return res.json(personagemAtualizado);
    }

    async delete(req: Request, res: Response){
        const deleteMessage = await personagemService.delete(req.params.id)
        return res.json(deleteMessage);
    }
}

export default new personagemController();
*/