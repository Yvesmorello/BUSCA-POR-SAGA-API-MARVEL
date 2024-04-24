import { Request, Response } from "express";
import creatorService from "../services/creator.service";
import creatorSchema from "../schema/creator.schema";
import axios from "axios";

class creatorController{

    async create(req: Request, res: Response) {
        try {
            const creatorCreated = await creatorService.create(req.body);
            res.status(201).json(creatorCreated);
        } catch (error) {
            console.error("Erro ao criar personagem:", error);
            res.status(500).json({ error: "Erro ao criar personagem" });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const apiUrl = `https://gateway.marvel.com:443/v1/public/events/238/creators?ts=1&apikey=d30c9fc66d3d6906df988cffc78ae86a&hash=41adcf82f191215ea4eee5854c9c4a7f`;
        
            // Faz a solicitação HTTP para a Marvel API
            const response = await axios.get(apiUrl);

            const creatorData = response.data.data.results;

            const creatorWithoutId = creatorData.map((creator: any) => {
                const { _id, ...rest } = creator;
                return rest;
            });
        
            // Salva os criador no banco de dados MongoDB usando o modelo Mongoose
            const insertedCreators = await creatorSchema.insertMany(creatorWithoutId);

            res.json(insertedCreators);
        } catch (error) {
            console.error("Erro ao buscar criador:", error);
            res.status(500).json({ error: "Erro ao buscar criador" });
        }
    }

    
    async findAllFromDatabase(req: Request, res: Response) {
        try {
            // Busca todos os criador salvos no banco de dados MongoDB
            const creator = await creatorService.findAll();
            return res.json(creator);
        } catch (error) {
            console.error("Erro ao buscar criador no banco de dados:", error);
            res.status(500).json({ error: "Erro ao buscar criadores no banco de dados" });
        }
    }

    
  
    async findByIdFromDataBase(req: Request, res: Response) {
        try {
            const id = req.params.id; // Agora usamos o ID da API fornecido como parâmetro
            const creatorFinded = await creatorService.findByApiId(id); // Use uma função findByApiId para buscar pelo ID da API
            if (!creatorFinded) {
                return res.status(404).json({ error: "Criador não encontrado" });
            }
            return res.json(creatorFinded);
        } catch (error) {
            console.error("Erro ao buscar criador por ID da API:", error);
            return res.status(500).json({ error: "Erro ao buscar criador por ID da API" });
        }
    }
    
    async findById(req: Request, res: Response) {
        try {
            const creatorId = req.params.id;
            const apiUrl = `http://gateway.marvel.com/v1/public/creators/${creatorId}?&ts=1&apikey=d30c9fc66d3d6906df988cffc78ae86a&hash=41adcf82f191215ea4eee5854c9c4a7f`;

            // Faz a solicitação HTTP para a Marvel API para buscar o personagem por ID
            const response = await axios.get(apiUrl);

            const creatorData = response.data.data.results;

            // Retorna o personagem encontrado
            res.json(creatorData);
        } catch (error) {
            console.error("Erro ao buscar criador por ID:", error);
            res.status(500).json({ error: "Erro ao buscar criador por ID" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            // ID do criador fornecido na solicitação
            const creatorId = req.params.id;
    
            // Dados atualizados do criador obtidos da solicitação do cliente
            const updatedCreatorData = req.body;
    
            // Verifica se o ID fornecido é válido
            if (!creatorId) {
                return res.status(400).json({ error: "ID de criador não fornecido" });
            }
    
            // Atualiza os dados do criador no banco de dados
            const creatorUpdated = await creatorService.update(creatorId, updatedCreatorData);
    
            res.json(creatorUpdated);
        } catch (error) {
            console.error("Erro ao atualizar criador:", error);
            res.status(500).json({ error: "Erro ao atualizar criador" });
        }
    }

    
    async delete(req: Request, res: Response) {
        const deleteMessage = await creatorService.delete(req.params.id)
        return res.json(deleteMessage)
    }
}

export default new creatorController();