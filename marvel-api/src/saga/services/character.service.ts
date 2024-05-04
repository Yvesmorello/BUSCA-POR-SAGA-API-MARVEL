import characterModel from "../schema/character.schema"
import { characterType } from "../types/character.type"
import mongoose from "mongoose";

class characterService {

    async create (character: characterType){
        const characterCreated = await characterModel.create(character)
        return characterCreated;
    }

    async findAll(){
        const characterFound = await characterModel.find()
        return characterFound;
    }

    async findById(id: string){
        const characterFound = await characterModel.findById(id)
        return characterFound;
    }

    async findByApiId(id: string){
        const characterFound = await characterModel.findOne({ id }); 
        return characterFound;
    }


    async update(characterId: string, character: characterType) {
        try {    
            const characterUpdated = await characterModel.findOneAndUpdate(
                { id: characterId }, 
                {
                    name: character.name,
                    description: character.description,
                    thumbnail: character.thumbnail,
                    resourceURI: character.resourceURI,
                    comics: character.comics,
                    series: character.series,
                    stories: character.stories,
                    events: character.events,
                    urls: character.urls,
                    imgUrl: character.imgUrl
                },
                { new: true }
            );
    
            if (!characterUpdated) {
                throw new Error("Personagem não encontrado");
            }
    
            return characterUpdated;
        } catch (error: any) {
            throw new Error(`Erro ao atualizar personagem: ${error.message}`);
        }
    }
    
    async delete(id: string) {
        try {
            await characterModel.findByIdAndDelete(id)
            return 'Personagem Removido';
        } catch (error) {
            throw new Error(`Erro ao remover personagem: ${error}`)
        }
    }

    async findByNameStartingWith(initialLetter: string) {
        try {
            const charactersStartingWithLetter = await characterModel.find({ name: { $regex: new RegExp(`^${initialLetter}`, 'i') } });
            return charactersStartingWithLetter;
        } catch (error) {
            throw new Error(`Erro ao buscar personagens pela letra inicial: ${error}`)
        }
    }

    async findSeriesByCharacterApiId(characterApiId: string) {
        try {
            const character = await characterModel.findOne({ apiId: characterApiId });
            if (!character) {
                throw new Error("Personagem não encontrado");
            }
            
            return character.series;
        } catch (error) {
            throw new Error(`Erro ao buscar séries do personagem: ${error}`);
        }
    }
    
}

export default new  characterService;

