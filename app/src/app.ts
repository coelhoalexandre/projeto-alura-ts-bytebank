import ContaController from "./controllers/ContaController.js";
import MainController from "./controllers/MainController.js";
import TransacaoController from "./controllers/TransacaoController.js";
import { Armazenador } from "./models/Armazenador.js";
import Transacao from "./models/Transacao.js";

const saldoNoLocalStorage: number = Armazenador.obter<number>("Saldo") || 0;
const extratoNoLocalStorage: Transacao[] =
  Armazenador.obter<Transacao[]>("Extrato", (key: string, value: any) => {
    if (key === "data") {
      return new Date(value);
    }
    return value;
  }) || [];

const controller = new MainController(
  new ContaController("Joana", saldoNoLocalStorage, extratoNoLocalStorage),
  new TransacaoController(extratoNoLocalStorage)
);

const elementoFormulario = document.querySelector(
  ".block-nova-transacao form"
) as HTMLFormElement;

elementoFormulario.addEventListener("submit", (event) => {
  try {
    event.preventDefault();

    if (!elementoFormulario.checkValidity()) {
      alert("Por favor, preencha todos os campos da transação");
      return;
    }

    controller.novaTransacao();

    elementoFormulario.reset();
  } catch (error) {
    alert(error.message);
  }
});
