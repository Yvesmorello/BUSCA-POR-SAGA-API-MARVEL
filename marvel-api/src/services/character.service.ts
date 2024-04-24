import characterModel from "../schema/character.schema"
import { characterType } from "../types/character.type"
import mongoose from "mongoose";

class characterService {

    async create (character: characterType){
        const characterCreated = await characterModel.create(character)
        return characterCreated;
    }

    async findAll(){
        const characterFinded = await characterModel.find()
        return characterFinded;
    }

    async findById(id: string){
        const characterFinded = await characterModel.findById(id)
        return characterFinded;
    }

    async findByApiId(id: string){
        const characterFinded = await characterModel.findOne({ id }); // Busca pelo campo apiId
        return characterFinded;
    }


    async update(characterId: string, character: characterType) {
        try {    
            // Busca o personagem pelo ID fornecido
            const characterUpdated = await characterModel.findOneAndUpdate(
                { id: characterId }, // Usamos o campo _id para filtrar
                {
                    name: character.name,
                    description: character.description,
                    thumbnail: character.thumbnail,
                    resourceURI: character.resourceURI, // Manter o resourceURI como uma string
                    comics: character.comics,
                    series: character.series,
                    stories: character.stories,
                    events: character.events,
                    urls: character.urls,
                    imgUrl: character.imgUrl
                },
                { new: true }
            );
    
            // Verifica se o personagem foi encontrado e atualizado
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
            return "Personagem Removido"
        } catch (error) {
            throw new Error(`Erro ao remover personagem: ${error}`)
        }
    }

}

export default new  characterService;

