import { Router } from 'express';
import characterController from './marvel-api/src/controller/character.controller';
import creatorController from './marvel-api/src/controller/creator.controller';
import comicController from './marvel-api/src/controller/comic.controller';
import axios from 'axios';


const apiRoutes = Router();
const dbRoutes  = Router();

// ROTAS API 

//PERSONAGEM
apiRoutes.get('/characters', characterController.findAll);// Get API
apiRoutes.get('/characters/:id', characterController.findById); // Buscar character por ID

///CRIADOR
apiRoutes.get('/creators', creatorController.findAll); // Listar todos os creator
apiRoutes.get('/creators/:id', creatorController.findById); // Buscar criador por ID

//QUADRINHO
apiRoutes.get('/comics', comicController.findAll); // Listar todos os comic
apiRoutes.get('/comics/:id', comicController.findById); // Buscar quadrinho por ID


//ROTAS DO BANCO DE DADOS

//PERSONAGEM
dbRoutes.get('/characters', characterController.findAllFromDatabase);         // Buscar tos os personagens no Banco de Dados
dbRoutes.get('/characters/:id', characterController.findByIdFromDataBase);   //  Buscar parsonagem por ID (usar o id próprio do personagem ou ID do banco de dados)
dbRoutes.post('/characters', characterController.create);                    //   Criar novo personagem
dbRoutes.put('/characters/:id', characterController.update);               //    Atualizar um personagem no banco de dados (Pode utilizar o id próprio do personagem)
dbRoutes.delete('/characters/:id', characterController.delete);           //     Deletar um personagem do banco de dados (Fazer a exclusão utilizando o ID do banco de dados)

//CRIADOR
dbRoutes.get('/creators', creatorController.findAllFromDatabase);        // Listar todos os criadores no Banco de Dados
dbRoutes.get('/creators/:id', creatorController.findByIdFromDataBase);  // Buscar criador por ID (usar o id próprio do criador ou ID do banco de dados)
dbRoutes.post('/creators', creatorController.create);                  // Criar novo criador
dbRoutes.put('/creators/:id', creatorController.update);              // Você só pode atualizar o firstName, middleName, lastName, sufix, fulllName, modified, thumbnail e comics do Criador (usar o id próprio do criador ou ID do banco de dados)
dbRoutes.delete('/creators/:id', creatorController.delete);

//QUADRINHO
dbRoutes.get('/comics', comicController.findAllFromDatabase);          // Listar todos os comic
dbRoutes.get('/comics/:id', comicController.findByIdFromDataBase);    // Buscar quadrinho por ID
dbRoutes.post('/comics', comicController.create);                    // Criar novo quadrinho
dbRoutes.delete('/comics/:id', comicController.delete);             //Rota para deletar um quadirnho (utilizar ID do Banco de Dados)
dbRoutes.put('/comics/:id', comicController.update);               // Atualizar quadrinho por ID

export {
    apiRoutes, dbRoutes
}
