const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repository);

  return response.send('Repositorio criado com sucesso!');
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs, likes } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);
  if (repositoryIndex < 0){
    return response.status(400).send('Repositorio nao encontrado!');
  }
  const repository = { id, title, url, techs, likes: likes};
  repositories[repositoryIndex] = repository;
  return response.send('Repositorio alterado!');


  

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.find(repository => repository.id == id);
  if (repositoryIndex < 0){
    return response.status(400).send('Repositorio nao encontrado!');
  }
  repositories.splice(repositoryIndex);
  return response.send('Repositorio deletado!');
  

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id == id);
  if(repositoryIndex < 0)
    return response.status(400).send('Repositorio nao encontrado!');
  repositories.likes[repositoryIndex] = repositories.likes[repositoryIndex] +1;
  return response.send('likezinho brabo');

});

module.exports = app;
