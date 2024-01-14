import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
  validator: (valor) => valor !== "",
  message: ({ path }) => `O valor do ${path} não pode ser vazio.`,
});
