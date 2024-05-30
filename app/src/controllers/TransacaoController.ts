import { TipoTransacao } from "../types/enums/TipoTransacao.js";
import Transacao from "../models/Transacao.js";
import Transacoes from "../models/Transacoes.js";
import DepositarOuDebitar from "../utils/DepositarOuDebitar.js";

export default class TransacaoController {
  private inputTipoTransacao = document.querySelector(
    "#tipoTransacao"
  ) as HTMLInputElement;
  private inputValor = document.querySelector("#valor") as HTMLInputElement;
  private inputData = document.querySelector("#data") as HTMLInputElement;
  private transacoes: Transacoes = new Transacoes();

  constructor(extratoNoLocalStorage: Transacao[]) {
    this.transacoes.empurrarTransacoes(extratoNoLocalStorage);
  }

  public criarTransacao(saldoAtual: number) {
    const transacao = new Transacao(
      this.inputTipoTransacao.value as TipoTransacao,
      parseFloat(this.inputValor.value),
      new Date(this.inputData.value + " 00:00:00 ")
    );
    if (
      transacao.transacaoEhValida(
        transacao.tipoTransacao,
        saldoAtual,
        transacao.valor
      )
    ) {
      this.transacoes.adicionarNovaTransacao(transacao);
      const tipoDeTransacao = DepositarOuDebitar(transacao.tipoTransacao);
      if (tipoDeTransacao === TipoTransacao.DEPOSITAR) {
        return { valor: +transacao.valor, extrato: this.transacoes.lista() };
      } else if (tipoDeTransacao === TipoTransacao.DEBITAR) {
        transacao.valor *= -1;
        return { valor: transacao.valor, extrato: this.transacoes.lista() };
      }
    }
    return;
  }

  public atualizarTransacoes() {}
}
