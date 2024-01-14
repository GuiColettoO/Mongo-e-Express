import ErroBase from "./ErroBase.js";

class NaoEncotrado extends ErroBase {
  constructor(mensagem = "Endpoint não encontrado") {
    super(mensagem, 404);
  }
}

export default NaoEncotrado;
