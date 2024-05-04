import comicModel from "../schema/comic.schema"
import { comicType } from "../types/comic.type"

class  comicService {

    async create (quadrinho: comicType){
        const comicCreated = await comicModel.create(quadrinho)
        return comicCreated;
    }

    async findAll(){
        const comicFound = await comicModel.find()
        return comicFound;
    }

    async findById(id: string){
        const comicFound = await comicModel.findById(id)
        return comicFound;
    }

    async findByApiId(id: string){
        const comicFound = await comicModel.findOne({ id }); 
        return comicFound;
    }

    async update(comicId: string, comic: comicType){
        try{
             const comicUpdated = await comicModel.findOneAndUpdate({ id: comicId},
          {
            title: comic.title,
            issueNumber: comic.issueNumber,
            variantDescription: comic.description,
            description: comic.description,
            modified: comic.modified,
            isbn: comic.isbn,
            upc: comic.upc,
            format: comic.format,
            pageCount: comic.pageCount,
            textObjects: comic.textObjects,
            resourceURI: comic.resourceURI,
            urls: comic.urls,
            series: comic.series,
            dates: comic.dates,
            prices: comic.prices,
            thumbnail: comic.thumbnail,
            images: comic.images,
            creators: comic.creators,
            characters: comic.characters,
            stories: comic.stories,
            events: comic.events,
            publitionDate: comic.publitionDate,
            capaUrl: comic.capaUrl 
        }, { new: true });
        

         if (!comicUpdated) {
            throw new Error("Quadrinho não encontrado");
        }

        return comicUpdated;
    }catch(error: any){
        throw new Error(`Erro ao atualizar quadrinho: ${error.message}`);
      }
    }

    async delete(id: string) {
        try {
            await comicModel.findByIdAndDelete(id)
            return "Quadrinho Removido"
        } catch (error) {
            throw new Error(`Erro ao remover quadrinho: ${error}`)
        }
    }

    async findCreatorsByComicApiId(comicApiId: string) {
        try {
            const comic = await comicModel.findOne({ apiId: comicApiId });
            if (!comic) {
                throw new Error("Quadrinho não encontrado no banco de dados");
            }
            const creators = comic.creators;
            return creators;
        } catch (error) {
            throw new Error(`Erro ao buscar criadores da comic: ${error}`);
        }
    }

    async getComicPriceByApiId(comicApiId: string) {
        try {
            const comic = await comicModel.findOne({ apiId: comicApiId });
    
            if (!comic) {
                throw new Error("Quadrinho não encontrado no banco de dados");
            }
    
            const comics = comic.prices;
            return comics;
        } catch (error) {
            console.error("Erro ao buscar preço do quadrinho pelo ID da API:", error);
            throw new Error("Erro ao buscar preço do quadrinho pelo ID da API");
        }
    }

    async getComicCharactersByApiId(comicApiId: string) {
        try {
            const comic = await comicModel.findOne({ apiId: comicApiId });

            if (!comic) {
                throw new Error("Quadrinho não encontrado no banco de dados");
            }
    
            const comics = comic.characters;
            return comics;
        } catch (error) {
            console.error("Erro ao buscar personagem do quadrinho pelo ID da API:", error);
            throw new Error("Erro ao buscar personagem do quadrinho pelo ID da API");
        }
    }
}

export default new comicService;

