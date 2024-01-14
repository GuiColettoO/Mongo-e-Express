import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    titulo: {
      type: String,
      required: [true, "O título do livro é obrigatório."],
    },
    editora: {
      type: String,
      required: [true, "O editor do livro é obrigatório."],
      enum: {
        values: ["Editora A", "Editora B", "Editora C", "Editora D"],
        message: "A editora {VALUE} não é válida.",
      },
    },
    preco: {
      type: Number,
    },
    paginas: {
      type: Number,
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message:
          "O número de páginas deve estar entre 10 e 5000. Valor fornecido {VALUE}",
      },
    },
    autor: {
      type: autorSchema,
      required: [true, "O autor do livro é obrigatório."],
    },
  },
  { versionKey: false }
);

const livro = mongoose.model("livros", livroSchema);

export default livro;
