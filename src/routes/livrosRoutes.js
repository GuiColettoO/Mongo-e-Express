import express from "express";
import LivroController from "../controller/livroController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/livros", LivroController.listaLivros, paginar);
routes.get("/livros/busca", LivroController.listarLivrosPorFiltro, paginar);
routes.get("/livros/:id", LivroController.listaLivroPorId);
routes.post("/livros", LivroController.cadastrarLivro);
routes.put("/livros/:id", LivroController.atualizarLivro);
routes.delete("/livros/:id", LivroController.deletarLivro);

export default routes;
