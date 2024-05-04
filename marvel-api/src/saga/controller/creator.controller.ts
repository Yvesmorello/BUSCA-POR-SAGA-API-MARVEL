import { Request, Response } from "express";
import creatorService from "../services/creator.service";
import creatorSchema from "../schema/creator.schema";
import axios from "axios";
import comicSchema from "../schema/comic.schema";


class creatorController{

    async create(req: Request, res: Response) {
        try {
            const creatorCreated = await creatorService.create(req.body);
            res.status(201).json(creatorCreated);
        } catch (error) {
            console.error("Erro ao criar criador:", error);
            res.status(500).json({ error: "Erro ao criar criador" });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const apiUrl = `https://gateway.marvel.com:443/v1/public/events/238/creators?ts=1&apikey=d30c9fc66d3d6906df988cffc78ae86a&hash=41adcf82f191215ea4eee5854c9c4a7f`;

            const response = await axios.get(apiUrl);

            const creatorData = response.data.data.results;

            const creatorWithoutId = creatorData.map((creator: any) => {
                const { _id, ...rest } = creator;
                return rest;
            });
        
            const insertedCreators = await creatorSchema.insertMany(creatorWithoutId);

            res.json(insertedCreators);
        } catch (error) {
            console.error("Erro ao buscar criador:", error);
            res.status(500).json({ error: "Erro ao buscar criador" });
        }
    }

    
    async findAllFromDatabase(req: Request, res: Response) {
        try {
            const creator = await creatorService.findAll();
            return res.json(creator);
        } catch (error) {
            console.error("Erro ao buscar criador no banco de dados:", error);
            res.status(500).json({ error: "Erro ao buscar criadores no banco de dados" });
        }
    }

    
  
    async findByIdFromDataBase(req: Request, res: Response) {
        try {
            const id = req.params.id; 
            const creatorFound = await creatorService.findByApiId(id); 
            if (!creatorFound) {
                return res.status(404).json({ error: "Criador não encontrado" });
            }
            return res.json(creatorFound);
        } catch (error) {
            console.error("Erro ao buscar criador por ID da API:", error);
            return res.status(500).json({ error: "Erro ao buscar criador por ID da API" });
        }
    }
    
    async findById(req: Request, res: Response) {
        try {
            const creatorId = req.params.id;
            const apiUrl = `http://gateway.marvel.com/v1/public/creators/${creatorId}?&ts=1&apikey=d30c9fc66d3d6906df988cffc78ae86a&hash=41adcf82f191215ea4eee5854c9c4a7f`;

            const response = await axios.get(apiUrl);

            const creatorData = response.data.data.results;

            res.json(creatorData);
        } catch (error) {
            console.error("Erro ao buscar criador por ID:", error);
            res.status(500).json({ error: "Erro ao buscar criador por ID" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const creatorId = req.params.id;
            const updatedCreatorData = req.body;

            if (!creatorId) {
                return res.status(400).json({ error: "ID de criador não fornecido" });
            }
           
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