import comicModel from "../schema/comic.schema"
import { comicType } from "../types/comic.type"

class  comicService {

    async create (quadrinho: comicType){
        const quadrinhoCriado = await comicModel.create(quadrinho)
        return quadrinhoCriado;
    }

    async findAll(){
        const quadrinhoEncontrado = await comicModel.find()
        return quadrinhoEncontrado;
    }

    async findById(id: string){
        const quadrinhoEncontrado = await comicModel.findById(id)
        return quadrinhoEncontrado;
    }

    async findByApiId(id: string){
        const comicFinded = await comicModel.findOne({ id }); // Busca pelo campo apiId
        return comicFinded;
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
        
         // Verifica se o personagem foi encontrado e atualizado
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
}

export default new comicService;

