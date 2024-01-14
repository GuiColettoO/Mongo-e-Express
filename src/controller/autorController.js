import NaoEncotrado from "../erros/NaoEncontrado.js";
import { autor } from "../models/index.js";

class AutorController {
  static async listaAutores(req, res, next) {
    try {
      const autoresResultado = autor.find();

      req.resultado = autoresResultado;

      next();
    } catch (erro) {
      next(erro);
    }
  }

  static async listaAutorPorId(req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado !== null) {
        res.status(200).json(autorEncontrado);
      } else {
        next(new NaoEncotrado("Autor não encontrado!"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarAutor(req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);
      res
        .status(201)
        .json({ message: "Autor cadastrado com sucesso!", autor: novoAutor });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarAutor(req, res, next) {
    try {
      const id = req.params.id;
      const update = req.body;
      const autorAtualizado = await autor.findByIdAndUpdate(id, update);

      if (autorAtualizado !== null) {
        res.status(200).send({
          message: "Autor atualizado com sucesso!",
          autor: autorAtualizado,
        });
      } else {
        next(new NaoEncotrado("Autor não encontrado!"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async deletarAutor(req, res, next) {
    try {
      const id = req.params.id;
      const livroResultado = await autor.findByIdAndDelete(id);
      if (livroResultado !== null) {
        res.status(200).json({ message: "Autor deletado com sucesso!" });
      } else {
        next(new NaoEncotrado("Autor não encontrado!"));
      }
    } catch (erro) {
      next(erro);
    }
  }
}

export default AutorController;
