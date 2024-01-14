import express from "express";
import dbConnect from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

const conexao = await dbConnect();

conexao.on("error", (erro) => {
  console.error("Erro na conexão com o MongoDB:", erro);
});

conexao.once("open", () => {
  console.log("Conexão com o MongoDB realizada com sucesso!");
});

const app = express();
app.use(express.json());
routes(app);

app.use(manipulador404);

app.use(manipuladorDeErros);

export default app;
