import { TipoTransacao } from "../types/enums/TipoTransacao.js";
import DepositarOuDebitar from "../utils/DepositarOuDebitar.js";
export default class Transacao {
    tipoTransacao;
    valor;
    data;
    constructor(tipoTransacao, valor, data) {
        this.tipoTransacao = tipoTransacao;
        this.valor = valor;
        this.data = data;
    }
    transacaoEhValida(tipoTransacao, saldoAtual, valor) {
        if (tipoTransacao === TipoTransacao.DEPOSITO ||
            tipoTransacao === TipoTransacao.TRANFERENCIA ||
            tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO) {
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
        }
        else {
            throw new Error("Tipo de Transação é inválido!");
        }
    }
    depositarEhValido(valor) {
        if (valor <= 0) {
            throw new Error("O valor a ser depositado deve ser maior que zero!");
        }
    }
    debitarEhValido(valor, saldo) {
        if (valor <= 0) {
            throw new Error("O valor a ser debitado deve ser maior que zero!");
        }
        if (valor > saldo) {
            throw new Error("Saldo insuficiente.");
        }
    }
}
