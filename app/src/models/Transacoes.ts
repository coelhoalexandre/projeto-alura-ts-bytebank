import Transacao from "./Transacao.js";

export default class Transacoes {
  private transacoes: Transacao[] = [];

  public empurrarTransacoes(transacoes: Transacao[]) {
    this.transacoes = transacoes;
  }

  public adicionarNovaTransacao(novaTransacao: Transacao) {
    this.transacoes.push(novaTransacao);
  }

  public lista(): Transacao[] {
    return this.transacoes;
  }
}
