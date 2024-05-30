import { TipoTransacao } from "../types/enums/TipoTransacao.js";
import Transacao from "../models/Transacao.js";
import Transacoes from "../models/Transacoes.js";
import DepositarOuDebitar from "../utils/DepositarOuDebitar.js";
export default class TransacaoController {
    inputTipoTransacao = document.querySelector("#tipoTransacao");
    inputValor = document.querySelector("#valor");
    inputData = document.querySelector("#data");
    transacoes = new Transacoes();
    constructor(extratoNoLocalStorage) {
        this.transacoes.empurrarTransacoes(extratoNoLocalStorage);
    }
    criarTransacao(saldoAtual) {
        const transacao = new Transacao(this.inputTipoTransacao.value, parseFloat(this.inputValor.value), new Date(this.inputData.value + " 00:00:00 "));
        if (transacao.transacaoEhValida(transacao.tipoTransacao, saldoAtual, transacao.valor)) {
            this.transacoes.adicionarNovaTransacao(transacao);
            const tipoDeTransacao = DepositarOuDebitar(transacao.tipoTransacao);
            if (tipoDeTransacao === TipoTransacao.DEPOSITAR) {
                return { valor: +transacao.valor, extrato: this.transacoes.lista() };
            }
            else if (tipoDeTransacao === TipoTransacao.DEBITAR) {
                transacao.valor *= -1;
                return { valor: transacao.valor, extrato: this.transacoes.lista() };
            }
        }
        return;
    }
    atualizarTransacoes() { }
}
