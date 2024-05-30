import { TipoTransacao } from "../types/enums/TipoTransacao.js";
import DepositarOuDebitar from "../utils/DepositarOuDebitar.js";

export default class Transacao {
  constructor(
    public readonly tipoTransacao: TipoTransacao,
    public valor: number,
    public readonly data: Date
  ) {}

  public transacaoEhValida(
    tipoTransacao: TipoTransacao,
    saldoAtual: number,
    valor: number
  ): boolean {
    if (
      tipoTransacao === TipoTransacao.DEPOSITO ||
      tipoTransacao === TipoTransacao.TRANFERENCIA ||
      tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO
    ) {
      switch (DepositarOuDebitar(tipoTransacao)) {
        case TipoTransacao.DEPOSITAR:
          this.depositarEhValido(valor);
          break;
        case TipoTransacao.DEBITAR:
          this.debitarEhValido(valor, saldoAtual);
          break;
        default:
          break;
      }
      return true;
    } else {
      throw new Error("Tipo de Transação é inválido!");
    }
  }

  private depositarEhValido(valor: number): void {
    if (valor <= 0) {
      throw new Error("O valor a ser depositado deve ser maior que zero!");
    }
  }
  private debitarEhValido(valor: number, saldo: number): void {
    if (valor <= 0) {
      throw new Error("O valor a ser debitado deve ser maior que zero!");
    }
    if (valor > saldo) {
      throw new Error("Saldo insuficiente.");
    }
  }
}
