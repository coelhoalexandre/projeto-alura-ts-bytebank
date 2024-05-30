import IGrupoTransacao from "../types/interfaces/IGrupoTransacao.js";
import Transacao from "./Transacao.js";

export default class Conta {
  constructor(
    public readonly nome: string,
    protected _saldo: number,
    private _extrato: Transacao[] = []
  ) {}

  public get saldo(): number {
    const saldo = this._saldo;
    return saldo;
  }

  public get extrato(): Transacao[] {
    const extrato = this._extrato;
    return extrato;
  }

  public novoExtrato(extrato: Transacao[]) {
    this._extrato = extrato;
  }

  public alterarSaldo(valor: number): void {
    this._saldo += valor;
  }

  public pegarGrupoTrancacoes(): IGrupoTransacao[] {
    const gruposTransacoes: IGrupoTransacao[] = [];
    const listaTransacoes: Transacao[] = structuredClone(this._extrato);
    const transacoesOrdenadas: Transacao[] = listaTransacoes.sort(
      (t1, t2) => t2.data.getTime() - t1.data.getTime()
    );
    let labelAtualGrupoTransacao: string = "";

    for (let transacao of transacoesOrdenadas) {
      let labelGrupoTransacao: string = transacao.data.toLocaleDateString(
        "pt-br",
        { month: "long", year: "numeric" }
      );
      if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
        labelAtualGrupoTransacao = labelGrupoTransacao;
        gruposTransacoes.push({
          label: labelGrupoTransacao,
          transacoes: [],
        });
      }
      gruposTransacoes.at(-1)?.transacoes.push(transacao);
    }

    return gruposTransacoes;
  }
}
