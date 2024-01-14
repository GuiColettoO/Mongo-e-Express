import express from "express";
import autorController from "../controller/autorController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/autores", autorController.listaAutores, paginar);
routes.get("/autores/:id", autorController.listaAutorPorId);
routes.post("/autores", autorController.cadastrarAutor);
routes.put("/autores/:id", autorController.atualizarAutor);
routes.delete("/autores/:id", autorController.deletarAutor);

export default routes;
