import { livro } from "../models/index.js";
import { autor } from "../models/index.js";
import NaoEncotrado from "../erros/NaoEncontrado.js";

class LivroController {
  static async listaLivros(req, res, next) {
    try {
      const buscaLivros = livro.find();

      req.resultado = buscaLivros;

      next();
    } catch (erro) {
      next(erro);
    }
  }

  static async listaLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      if (livroEncontrado !== null) {
        res.status(200).json(livroEncontrado);
      } else {
        next(new NaoEncotrado("Id do Livro não encontrado!"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = {
        ...novoLivro,
        autor: { ...autorEncontrado._doc },
      };
      const livroCriado = await livro.create(livroCompleto);
      res
        .status(201)
        .json({ message: "Livro cadastrado com sucesso!", livro: livroCriado });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const id = req.params.id;
      const update = req.body;
      const livroAtualizado = await livro.findByIdAndUpdate(id, update);

      if (livroAtualizado !== null) {
        res.status(200).json({
          message: "Livro atualizado com sucesso!",
          livro: livroAtualizado,
        });
      } else {
        next(new NaoEncotrado("Livro não encontrado!"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async deletarLivro(req, res, next) {
    try {
      const id = req.params.id;
      const autorResultado = await livro.findByIdAndDelete(id);

      if (autorResultado !== null) {
        res.status(200).json({ message: "Livro deletado com sucesso!" });
      } else {
        next(new NaoEncotrado("Livro não encontrado!"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivrosPorFiltro(req, res, next) {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = livro.find(busca).populate("autor");

        req.resultado = livrosResultado;

        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  }
}

async function processaBusca(params) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = params;

  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autor.findOne({ nome: nomeAutor });

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default LivroController;
