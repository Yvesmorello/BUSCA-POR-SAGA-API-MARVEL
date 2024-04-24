import { Request, Response } from "express";
import comicService from "../services/comic.service";
import axios from "axios";
import comicSchema from "../schema/comic.schema";
import { json } from "stream/consumers";

class comicController {

    async create(req: Request, res: Response) {
        try {
            const comicCreated = await comicService.create(req.body);
            res.status(201).json(comicCreated);
        } catch (error) {
            console.error("Erro ao criar personagem:", error);
            res.status(500).json({ error: "Erro ao criar personagem" });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const apiUrl = `http://gateway.marvel.com/v1/public/events/238/comics?&ts=1&apikey=d30c9fc66d3d6906df988cffc78ae86a&hash=41adcf82f191215ea4eee5854c9c4a7f`;
        
            // Faz a solicitação HTTP para a Marvel API
            const response = await axios.get(apiUrl);

            const comicsData = response.data.data.results;

            const comicsWithoutId = comicsData.map((comics: { [x: string]: any; _id: any; }) => {
                const { _id, ...rest } = comics;
                return rest;
            });

            // Salva os personagens no banco de dados MongoDB usando o modelo Mongoose
            const insertedComics = await comicSchema.insertMany(comicsWithoutId);

            res.json(insertedComics);
        } catch (error) {
            console.error("Erro ao buscar personagens:", error);
            res.status(500).json({ error: "Erro ao buscar personagens" });
        }
    }

    async findAllFromDatabase(req: Request, res: Response) {
        try {
            // Busca todos os personagens salvos no banco de dados MongoDB
            const comics = await comicService.findAll();
            return res.json(comics);
        } catch (error) {
            console.error("Erro ao buscar quadrinho no banco de dados:", error);
            res.status(500).json({ error: "Erro ao buscar quadrinho no banco de dados" });
        }
    }

    
    async findByIdFromDataBase(req: Request, res: Response) {
        try {
            const id = req.params.id; // Agora usamos o ID da API fornecido como parâmetro
            const comicFinded = await comicService.findByApiId(id); // Use uma função findByApiId para buscar pelo ID da API
            if (!comicFinded) {
                return res.status(404).json({ error: "Quadrinho não encontrado" });
            }
            return res.json(comicFinded);
        } catch (error) {
            console.error("Erro ao buscar quadrinho por ID da API:", error);
            return res.status(500).json({ error: "Erro ao buscar quadrinho por ID da API" });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const comicFinded = await comicService.findById(req.params.id);
            if (!comicFinded) {
                return res.status(404).json({ error: "Quadrinho não encontrado" });
            }
            res.json(comicFinded);
        } catch (error) {
            console.error("Erro ao buscar quadrinho por ID:", error);
            res.status(500).json({ error: "Erro ao buscar quadrinho por ID" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const comicUpdated = await comicService.update(req.params.id, req.body);
            if (!comicUpdated) {
                return res.status(404).json({ error: "Quadrinho não encontrado" });
            }
            res.json(comicUpdated);
        } catch (error) {
            console.error("Erro ao atualizar quadrinho:", error);
            res.status(500).json({ error: "Erro ao atualizar quadrinho" });
        }
    }

    async delete(req: Request, res: Response) {
        const deleteMessage = await comicService.delete(req.params.id)
        return res.json(deleteMessage)
    }
    
}

export default new comicController();

























/*
import { Request, Response } from "express";
import quadrinhoService from "../services/quadrinho.service";



class quadrinhoController{

    async create(req: Request, res: Response){
        const quadrinhoCriado = await quadrinhoService.create(req.body)
        res.status(201)
        return res.json(quadrinhoCriado);
    }

    async findAll(req: Request, res: Response){
        const quadrinhoEncontrado = await quadrinhoService.findAll()
        return res.json(quadrinhoEncontrado);
    }

    async findById(req: Request, res: Response){
        const quadrinhoEncontrado = await quadrinhoService.findById(req.params.id)
        return res.json(quadrinhoEncontrado);
    }

    async update(req: Request, res: Response){
        const quadrinhoAtualizado = await quadrinhoService.update(req.params.id, req.body)
        return res.json(quadrinhoAtualizado);
    }

    async delete(req: Request, res: Response){
        const deleteMessage = await quadrinhoService.delete(req.params.id)
        return res.json(deleteMessage);
    }
}

export default new quadrinhoController();
*/