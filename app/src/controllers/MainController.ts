import { Armazenador } from "../models/Armazenador.js";
import Conta from "../models/Conta.js";
import Transacao from "../models/Transacao.js";
import ExtratoView from "../views/ExtratoView.js";
import ContaController from "./ContaController.js";
import TransacaoController from "./TransacaoController.js";

export default class MainController {
  private cliente: Conta;
  private extratoView: ExtratoView = new ExtratoView();
  constructor(
    private clienteController: ContaController,
    private transacaoController: TransacaoController
  ) {
    this.cliente = clienteController.exibirCliente();
    this.atualizarRenderizacao();
    console.log(this.cliente.extrato);
  }

  public novaTransacao() {
    const objeto = this.transacaoController.criarTransacao(this.cliente.saldo);
    if (objeto?.valor) {
      this.clienteController.adicionarSaldo(objeto.valor);
      this.clienteController.atualizarExtrato(objeto.extrato);
      this.atualizarLocalStorage(this.cliente.saldo, this.cliente.extrato);
      this.atualizarRenderizacao();
    }
  }

  private atualizarRenderizacao() {
    this.extratoView.renderizarExtrato(this.cliente.pegarGrupoTrancacoes());
  }

  private atualizarLocalStorage(saldo: number, extrato: Transacao[]) {
    Armazenador.salvar("Saldo", saldo);
    Armazenador.salvar("Extrato", extrato);
  }
}
